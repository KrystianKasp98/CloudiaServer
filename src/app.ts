import * as express from 'express';
import {Request, Response, Application} from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cors = require('cors');
import { responseText, statusCode } from './utils/consts';
const Session = require('express-session');

import NotesApi from './db/Notes/notes';
import UsersApi from './db/Users/users';
import routerNotes from './routes/Notes/notes';
import routerUsers from './routes/Users/users';
import ErrorHandler from './error';

const store = new Session.MemoryStore();
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
app.use(Session({
  secret: process.env.SESSION_SECRET,
  cookie: {maxAge: 30000},
  saveUninitialized: false,
  resave: true,
  store
}));

// middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(cors<Request>());
}

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.url.includes(notesPath)) {
      // @ts-ignore
      if (req.session.authenticated) {
        next();
      } else {
        res.status(statusCode.forbidden).send(responseText.authFailed);
      }
    } else {
      next();
    }
  });
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
