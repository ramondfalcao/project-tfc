import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  constructor(private userService: UserService) {}

  async login(req: Request, res: Response): Promise<void> {
    const validate = this.userService.validateReqBody(req.body);
    const token = await this.userService.login(validate);
    res.status(200).json({ token });
  }

  async loginValidate(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization;
    const tokenToString = String(token);
    const role = await this.userService.loginValidate(tokenToString);
    res.status(200).json({ role });
  }
}
