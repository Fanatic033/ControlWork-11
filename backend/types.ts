import mongoose, {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  token: string
}

export interface ProductMutation {
  salesman: mongoose.Types.ObjectId;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
}

export interface UserMethods {
  checkPassword(password: string): Promise<Boolean>;

  generateToken(): void
}

export type UserModel = Model<UserFields, {}, UserMethods>

