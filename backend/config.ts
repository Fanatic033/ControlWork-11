import {CorsOptions} from 'cors';
import path from 'node:path';


const rootPath = __dirname;

const corsWhiteList = ['http://localhost:5173'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by Cors'));
    }
  },
};

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  corsOptions,
  database: 'mongodb://localhost/controlWork',
};

export default config;
