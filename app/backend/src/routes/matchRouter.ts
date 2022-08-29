import { Router } from 'express';
import UserService from '../services/userService';
import MatchController from '../controllers/matchController';
import MatchService from '../services/matchService';

const matchController = new MatchController(new MatchService(), new UserService());

const matchRouter = Router();

matchRouter.get('/', (req, res) => matchController.list(req, res));

matchRouter.post('/', (req, res) => matchController.create(req, res));

matchRouter.patch('/:id/finish', (req, res) => matchController.updateMatchFinish(req, res));

matchRouter.patch('/:id', (req, res) => matchController.updateMatchInProgress(req, res));

export default matchRouter;
