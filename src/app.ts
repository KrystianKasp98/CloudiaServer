import * as express from 'express';
import {Request, Response, Application} from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cors = require('cors');
import { responseText, statusCode } from './utils/consts';
import { Session, sessionObject } from './utils/sessionStore';

import NotesApi from './db/Notes/notes';
import UsersApi from './db/Users/users';
import routerNotes from './routes/Notes/notes';
import routerUsers from './routes/Users/users';
import ErrorHandler from './error';

const app: Application = express();
const notesPath = '/notes';
const usersPath = '/users';
dotenv.config();

const dbInit = async () => {
  await NotesApi.init();
  await UsersApi.init();
};

dbInit().catch((err) => console.log(err));

// Session init
app.use(Session(sessionObject));

// middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(cors<Request>());
}

if (process.env.NODE_ENV === 'development') {
  app.use(ErrorHandler.sessionValidation);
}

app.use(helmet());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Hi from CloudiaServer'
  });
});
app.use(notesPath, routerNotes);
app.use(usersPath, routerUsers);
app.all('*', ErrorHandler.badRequest);

export default app;
