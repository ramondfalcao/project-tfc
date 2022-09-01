import { Router } from 'express';
import LeaderboardService from '../services/leaderboardService';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardController = new LeaderboardController(new LeaderboardService());

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req, res) => leaderboardController.listHome(req, res));

leaderboardRouter.get('/away', (req, res) => leaderboardController.listAway(req, res));

export default leaderboardRouter;
