import * as dotenv from 'dotenv';

export const Session = require('express-session');

dotenv.config();

const store = new Session.MemoryStore();
export const sessionObject = {
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 30000 },
  saveUninitialized: false,
  resave: true,
  store
};
