import { Router } from 'express';
import TeamController from '../controllers/teamController';
import TeamService from '../services/teamService';

const teamController = new TeamController(new TeamService());

const teamRouter = Router();

teamRouter.get('/', (req, res) => teamController.list(req, res));

teamRouter.get('/:id', (req, res) => teamController.findById(req, res));

export default teamRouter;
