import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  constructor(private userService: UserService) {}

  public login = async (req: Request, res: Response) => {
    const validate = this.userService.validateBodyLogin(req.body);
    const token = await this.userService.login(validate);
    res.status(200).json({ token });
  };

  public validation = async (req: Request, res: Response) => {
    const token = String(req.headers.authorization);
    const role = await this.userService.validation(token);
    res.status(200).json({ role });
  };
}
