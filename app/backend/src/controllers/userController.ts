import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  constructor(private userService: UserService) {}

  async login(req: Request, res: Response): Promise<void> {
    const validate = this.userService.validateReqBody(req.body);
    console.log(validate);
    const token = await this.userService.login(validate);
    res.status(200).json({ token });
  }

  async loginValidate(req: Request, res: Response): Promise<void> {
    const token = String(req.headers.authorization);
    const role = await this.userService.loginValidate(token);
    res.status(200).json({ role });
  }
}

export default UserController;
