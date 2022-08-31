import { Router } from 'express';
import LeaderboardService from '../services/leaderboardService';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardController = new LeaderboardController(new LeaderboardService());

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req, res) => leaderboardController.list(req, res));

export default leaderboardRouter;
