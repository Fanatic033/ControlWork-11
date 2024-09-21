import express from 'express';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import Product from '../model/Product';
import {ProductMutation} from '../types';
import {auth, RequestWithUser} from '../middleware/auth';

const productsRouter = express.Router();

productsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const productMutation: ProductMutation = {
      salesman: req.user!._id,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      image: req.file ? req.file.filename : null,
    };

    const product = new Product(productMutation);
    await product.save();

    return res.send(product);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

productsRouter.get('/', async (req, res, next) => {
  try {
    const filter: Record<string, unknown> = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter).populate('category', 'title');
    return res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'title').populate('salesman');


    if (product === null) {
      return res.status(404).send({error: 'Product not found'});
    }

    return res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {

    const {id} = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({error: 'Product not found'});
    }
    if (!product.salesman.equals(req.user!._id)) {
      return res.status(403).send({error: 'Not authorized to delete this product'});
    }

    await Product.deleteOne({_id: id})

    return res.send(`deleted product, ${product}`)
  } catch (e) {
    next(e)
  }
})


export default productsRouter;
