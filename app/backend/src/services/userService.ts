import { compareSync } from 'bcryptjs';
import * as Joi from 'joi';
import User from '../database/models/user';
import UserLogin from '../interfaces/userLogin';
import JwtService from './jwtService';

class UserService {
  validateReqBody = (data: object) => {
    const schema = Joi.object({
      email: Joi.string().required().messages({
        'string.empty': 'All fields must be filled',
      }),
      password: Joi.string().required().messages({
        'string.empty': 'All fields must be filled',
      }),
    });
    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  };

  login = async (reqLogin: UserLogin): Promise<string> => {
    const { email, password } = reqLogin;
    const user = await User.findOne({ where: { email } });

    if (!user || !compareSync(password, user.password)) {
      const err = new Error('Incorrect email or password');
      err.name = 'Unauthorized';
      throw err;
    }

    const token = JwtService.sign({ email, password });
    return token;
  };

  loginValidate = async (token: string): Promise<string> => {
    const verifyToken = JwtService.tokenValidation(token);
    const { email } = verifyToken;
    const user = await User.findOne({ where: { email } });
    return user?.getDataValue('role');
  };
}

export default UserService;
