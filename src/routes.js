import { Router } from 'express';

import SearchController from './app/controllers/SearchController';
import ReCheckCep from './middlewares/ReCheckCep';

const routes = new Router();

routes.get('/search/:cep', ReCheckCep, SearchController.show);

export default routes;
