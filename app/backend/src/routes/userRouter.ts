import { Router } from 'express';
import UserController from '../controllers/userController';

const userRouter = Router();

userRouter.get('/validate', (req, res) => UserController.loginValidate(req, res));
userRouter.post('/', (req, res) => UserController.login(req, res));

export default userRouter;
