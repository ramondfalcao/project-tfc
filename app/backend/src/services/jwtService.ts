import { Secret, sign, verify } from 'jsonwebtoken';
import User from '../interfaces/IUser';

const JWT_SECRET: Secret = 'jwt_secret';

class JwtService {
  static sign(data: { email: string, password: string }): string {
    return sign({ data }, JWT_SECRET);
  }

  static tokenValidation(token: string) {
    try {
      const data = verify(token, JWT_SECRET);
      return data as User;
    } catch (error) {
      const err = new Error('Token must be a valid token');
      err.name = 'Unauthorized';
      throw err;
    }
  }
}

export default JwtService;
