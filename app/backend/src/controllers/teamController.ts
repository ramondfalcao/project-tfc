import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  constructor(private teamService: TeamService) {}

  public list = async (_req: Request, res: Response) => {
    const result = await this.teamService.list();
    res.status(200).json(result);
  };

  public findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.teamService.findById(Number(id));
    res.status(200).json(result);
  };
}
