import express from 'express';
import cors from 'cors';
import routes from './routes';
import mongoose from 'mongoose';

class App {
  constructor() {
    this.server = express();
    mongoose.connect('mongodb://localhost:27017/cepsearch',{ useNewUrlParser: true,useUnifiedTopology: true })
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());

    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
