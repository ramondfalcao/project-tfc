import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import User from '../interfaces/IUser';

class JwtService {
  static sign(data: { email: string, password: string }): string {
    return sign(data, process.env.JWT_SECRET || 'jwt_secret');
  }

  static tokenValidation(token: string) {
    try {
      const data = verify(token, process.env.JWT_SECRET || 'jwt_secret');
      return data as User;
    } catch (error) {
      const err = new Error('Token must be a valid token');
      err.name = 'Unauthorized';
      throw err;
    }
  }
}

export default JwtService;
