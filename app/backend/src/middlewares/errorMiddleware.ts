import { ErrorRequestHandler } from 'express';
import 'express-async-errors';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  const { name, message } = err;

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'Unauthorized':
      res.status(401).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      res.sendStatus(500);
  }

  next();
};

export default errorMiddleware;
