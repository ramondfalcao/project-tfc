import { Router } from 'express';
import UserService from '../services/userService';
import UserController from '../controllers/userController';

const userController = new UserController(new UserService());

const userRouter = Router();

userRouter.post('/', (req, res) => userController.login(req, res));
userRouter.get('/validate', (req, res) => userController.loginValidate(req, res));

export default userRouter;
