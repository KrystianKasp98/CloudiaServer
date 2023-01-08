import {Request, Response} from 'express';
import UsersApi from '../../db/Users/users';
import ErrorHandler from '../../error';
import {UserAddInterface, UserLoginInterface} from '../../db/types';
import {statusCode} from '../../utils/consts';

export default class ControllerUsers extends ErrorHandler {
  constructor() {
    super();
  }

  static async add(
    req: Request,
    res: Response
  ): Promise<void> {
    const callback = async () => {
      try {
        const {name, lastname, email, login, password}: UserAddInterface = req.body;
        const result = await UsersApi.addUser({name, lastname, email, login, password});
        const status = typeof result === 'string' ? statusCode.conflict : statusCode.created;
        res.status(status).json(result);
      } catch (err) {
        res.status(statusCode.notFound).json(err);
      }
    };

    await super.provider(req, res, callback);
  }

  static async login(
    req: Request,
    res: Response
  ): Promise<void> {
    const callback = async () => {
      try {
        const {login, password}: UserLoginInterface = req.body;
        const user = await UsersApi.loginUser({login, password});
        const status = user === null ? statusCode.forbidden : statusCode.ok;
        const result = user === null ? false : true;

        // handling session
        // @ts-ignore
        if (req.session.authenticated) {
          res.status(statusCode.ok).json(true);
        } else if (result) {
          // @ts-ignore
          req.session.authenticated = true;
          // @ts-ignore
          req.session.user = {
            login, password
          }
        }

        res.status(status).json(result);
      } catch (err: unknown) {
        res.status(statusCode.notFound).json(err);
      }
    };

    await super.provider(req, res, callback);
  }

  static async deleteById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const callback = async () => {
      try {
        const {id} = req.params;
        const result = await UsersApi.deleteUser(id);
        res.status(statusCode.ok).json(result);
      } catch (err: unknown) {
        res.status(statusCode.conflict).json(err);
      }
    };

    await super.provider(req, res, callback);
  }
}
