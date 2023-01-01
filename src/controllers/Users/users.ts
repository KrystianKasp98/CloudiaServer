import {Request, Response} from 'express';
import UsersApi from '../../db/Users/users';
import ErrorHandler from '../../error';
import {UserAddInterface, UserLoginInterface} from '../../db/types';

export default class ControllerUsers extends ErrorHandler {
  constructor() {
    super();
  }

  static async add(
    req: Request,
    res: Response
  ): Promise<void> {
    const callback = async () => {
      const {name, lastname, email, login, password}: UserAddInterface = req.body;
      const result = await UsersApi.addUser({name, lastname, email, login, password});
      const status = typeof result === 'string' ? 409 : 200;
      res.status(status).json(result);
    };

    await super.provider(req, res, callback);
  }

  static async login(
    req: Request,
    res: Response
  ): Promise<void> {
    const callback = async () => {
      const {login, password}: UserLoginInterface = req.body;
      const user = await UsersApi.loginUser({login, password});
      const status = user === null ? 403 : 200;
      const result = user === null ? false : true;
      res.status(status).json(result);
    };

    await super.provider(req, res, callback);
  }
}
