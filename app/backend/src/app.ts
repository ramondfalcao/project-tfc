import * as express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import userRouter from './routes/userRouter';
import 'express-async-errors';
import teamRouter from './routes/teamRouter';
import matchRouter from './routes/matchRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota teste avaliador remoto
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/login', userRouter);
    this.app.use('/teams', teamRouter);
    this.app.use('/matches', matchRouter);

    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
