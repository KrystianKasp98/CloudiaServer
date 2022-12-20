import * as express from 'express';
import {Request, Response, Application} from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cors = require('cors');

const app: Application = express();
dotenv.config();

// middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(cors<Request>());
}

app.use(helmet());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Hi from CloudiaServer'
  });
});

export default app;
