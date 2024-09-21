import mongoose, {Types} from 'mongoose';
import Category from './Category';
import User from './User';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  salesman: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'salesman does not exist!',
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const category = await Category.findById(value);
        return Boolean(category);
      },
      message: 'Category does not exist',
    }
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: null,
  }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;