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

  public updateMatchFinish = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.updateMatchFinish(Number(id));
    res.status(200).json({ message: 'Finished' });
  };

  public updateMatchInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.updateMatchInProgress({ id, ...req.body });
    res.status(200).json({ message: 'success' });
  };
}
