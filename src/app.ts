import * as express from 'express';
import {Request, Response, Application} from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cors = require('cors');

import NotesApi from './db/Notes/notes';
import UsersApi from './db/Users/users';
import routerNotes from './routes/notes';
import routerUsers from './routes/users';
import ErrorHandler from './error';

const app: Application = express();
dotenv.config();

const dbInit = async () => {
  await NotesApi.init();
  await UsersApi.init();
};

dbInit().catch((err) => console.log(err));

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
app.use('/notes', routerNotes);
app.use('/users', routerUsers);
app.all('*', ErrorHandler.badRequest);

export default app;
