import mongoose, {HydratedDocument} from 'mongoose';
import bcrypt from 'bcrypt';
import {randomUUID} from 'node:crypto';
import {UserFields, UserMethods, UserModel} from '../types';

const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema;
const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
  username: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (value: string): Promise<boolean> {
        if (!(this as HydratedDocument<UserFields>).isModified('nickname')) {
          return true;
        }
        const user = await User.findOne({nickname: value});
        return !user;
      },
      message: 'This nickname is already registered!',
    }
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: true,
  }
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);

export default User;