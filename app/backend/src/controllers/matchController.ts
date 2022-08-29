import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  constructor(private matchService: MatchService) {}

  public list = async (_req: Request, res: Response) => {
    const result = await this.matchService.list();
    res.status(200).json(result);
  };
}
