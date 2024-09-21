import mongoose from 'mongoose';
import config from './config';
import Category from './model/Category';
import Product from './model/Product';
import User from './model/User';

const run = async () => {
  await mongoose.connect(config.database)
  const db = mongoose.connection
  try {
    await db.dropCollection('users')
    await db.dropCollection('categories')
    await db.dropCollection('products')
  } catch (e) {
    console.log('Skipping drop...');
  }


  const user = new User({
    username: 'user',
    password: '1qaz@WSX',
    nickname: 'it',
    phoneNumber: +9960002322,
  });
  const user2 = new User({
    username: 'admin',
    password: 'admin',
    nickname: 'fish',
    phoneNumber: +9963324324,
  });
  user.generateToken();
  await user.save();
  user2.generateToken();
  await user2.save();

  const [compCategory, carCategory, sportCategory] = await Category.create(
    {
      title: 'Computers',
      description: 'A computer for computers',
    },
    {
      title: 'Cars',
      description: 'automobile',
    },
    {
      title: 'Sport',
      description: 'sport items',
    }
  )

  await Product.create({
      title: 'MacBook',
      price: 7000,
      category: compCategory,
      image: 'fixtures/mac.jpeg',
      salesman: user._id
    }, {
      title: 'Bmw M5',
      price: 1000000,
      category: carCategory,
      image: 'fixtures/bmw.jpeg',
      salesman: user2._id
    }, {
      title: 'Мяч',
      price: 500,
      category: sportCategory,
      image: 'fixtures/ball.jpeg',
      salesman: user2._id
    }
  );


  await db.close();

};


run().catch(console.error);
