import { Router } from 'express';

import SearchController from './app/controllers/SearchController';
import middlewareCep from './middlewares/middlewareCep';

const routes = new Router();

routes.get('/search/:cep', middlewareCep, SearchController.show);

export default routes;
