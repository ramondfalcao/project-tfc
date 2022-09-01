import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  public listHome = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.list('home');
    res.status(200).json(result);
  };

  public listAway = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.list('away');
    res.status(200).json(result);
  };
}
