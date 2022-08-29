import { Request, Response } from 'express';
import UserService from '../services/userService';
import MatchService from '../services/matchService';

export default class MatchController {
  constructor(private matchService: MatchService, private userService: UserService) {}

  public list = async (_req: Request, res: Response) => {
    const result = await this.matchService.list();
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const token = String(req.headers.authorization);
    await this.userService.validation(token);
    const result = await this.matchService.create(req.body);
    res.status(201).json(result);
  };

  public updateInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.updateInProgress(Number(id));
    res.status(200).json({ message: 'Finished' });
  };
}
