import mongoose from 'mongoose';
import config from './config';
import Category from './model/Category';

const run = async () => {
  await mongoose.connect(config.database)
  const db = mongoose.connection
  try {
    await db.dropCollection('users')
    await db.dropCollection('categories')
  } catch (e) {
    console.log('Skipping drop...');
  }

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
  await db.close();

};


run().catch(console.error);
