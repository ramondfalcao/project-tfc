import * as Joi from 'joi';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/user';
import UserLogin from '../interfaces/IUserLogin';
import JwtService from './jwtService';

class UserService {
  validateBodyLogin = (data: object) => {
    const schema = Joi.object({
      email: Joi.string().required().messages({
        'string.empty': 'All fields must be filled',
      }),
      password: Joi.string().required().messages({
        'string.empty': 'All fields must be filled',
      }),
    });
    const { error, value } = schema.validate(data);

    if (error) {
      throw error;
    }

    return value;
  };

  public login = async (reqLogin: UserLogin) => {
    const { email, password } = reqLogin;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const err = new Error('Incorrect email or password');
      err.name = 'Unauthorized';
      throw err;
    }

    if (!bcrypt.compare(password, user.password)) {
      const err = new Error('Incorrect email or password');
      err.name = 'Unauthorized';
      throw err;
    }

    const token = JwtService.sign({ email, password });
    return token;
  };

  public validation = async (token: string) => {
    const verifyToken = JwtService.tokenValidation(token);
    const { email } = verifyToken;
    const user = await User.findOne({ where: { email } });
    return user?.getDataValue('role');
  };
}

export default UserService;
