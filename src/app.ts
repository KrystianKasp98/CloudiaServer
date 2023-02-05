import * as express from 'express';
import { Request, Response, Application } from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cors = require('cors');

import { Session, sessionObject } from './utils/sessionStore';
import { PATHS } from './utils/consts';
import NotesApi from './db/Notes/notes';
import UsersApi from './db/Users/users';
import routerNotes from './routes/Notes/notes';
import routerUsers from './routes/Users/users';
import ErrorHandler from './error';

const app: Application = express();
dotenv.config();

const dbInit = () => {
  NotesApi.init();
  UsersApi.init();
};

const dbDisconect = () => {
  NotesApi.disconect();
  UsersApi.disconect();
};

try {
  dbInit();
} catch (err) {
  dbDisconect();
  console.log({ err });
}

// Session init
app.use(Session(sessionObject));

// middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(cors<Request>());
}

if (process.env.NODE_ENV === 'production') {
  app.use(ErrorHandler.sessionValidation);
}

app.use(helmet());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Hi from CloudiaServer'
  });
});
app.use(PATHS.NOTES, routerNotes);
app.use(PATHS.USERS, routerUsers);
app.all('*', ErrorHandler.badRequest);

export default app;
