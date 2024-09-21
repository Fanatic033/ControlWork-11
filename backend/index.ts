import express from 'express';
import * as mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import usersRouter from './routers/users';
import categoriesRouter from './routers/categories';
import productsRouter from './routers/products';


const app = express()

const port = 8000;
app.use(cors(config.corsOptions))
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);


const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  process.on('exit', () => {
    mongoose.disconnect()
  })
}

run().catch(err => console.log(err));