import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  public list = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.list();
    res.status(200).json(result);
  };
}
