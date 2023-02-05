import { Request, Response } from 'express';

import UsersApi from '../../db/Users/users';
import ErrorHandler from '../../error';
import { UserAddInterface, UserLoginInterface } from '../../db/types';
import { statusCode } from '../../utils/consts';
import CryptoHandler from '../../utils/cryptoHandler';

export default class ControllerUsers extends ErrorHandler {
  constructor() {
    super();
  }

  static async add(req: Request, res: Response): Promise<void> {
    const callback = async () => {
      try {
        const { name, lastname, email, login, password }: UserAddInterface =
          req.body;
        const result = await UsersApi.addUser({
          name,
          lastname,
          email,
          login,
          password: CryptoHandler.encryptPassword(password)
        });
        const status =
          typeof result === 'string' ? statusCode.CONFLICT : statusCode.CREATED;
        res.status(status).json(result);
      } catch (err) {
        res.status(statusCode.NOT_FOUND).json(err);
      }
    };

    await super.provider(req, res, callback);
  }

  static async login(req: any, res: Response): Promise<void> {
    const callback = async () => {
      try {
        const { login, password }: UserLoginInterface = req.body;
        const user = await UsersApi.loginUser({ login, password });
        const status = user === null ? statusCode.FORBIDDEN : statusCode.OK;
        const result = user !== null;
        // handling session
        if (req.session.authenticated) {
          res.status(statusCode.OK).json(true);
        } else if (result) {
          req.session.authenticated = true;
          req.session.user = {
            login,
            password
          };
        }

        delete req.session?.user?.password;

        if (req.session) {
          res.status(status).json({ ...req.session, sessionID: req.sessionID });
        } else {
          res.status(status).json(result);
        }
      } catch (err: unknown) {
        res.status(statusCode.NOT_FOUND).json(err);
      }
    };

    await super.provider(req, res, callback);
  }

  static async deleteById(req: Request, res: Response): Promise<void> {
    const callback = async () => {
      try {
        const { id } = req.params;
        const result = await UsersApi.deleteUser(id);
        res.status(statusCode.OK).json(result);
      } catch (err: unknown) {
        res.status(statusCode.CONFLICT).json(err);
      }
    };

    await super.provider(req, res, callback);
  }
}
