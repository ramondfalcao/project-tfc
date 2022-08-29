import { Router } from 'express';
import MatchController from '../controllers/matchController';
import MatchService from '../services/matchService';

const matchController = new MatchController(new MatchService());

const matchRouter = Router();

matchRouter.get('/', (req, res) => matchController.list(req, res));

export default matchRouter;
