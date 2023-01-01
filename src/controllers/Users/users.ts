import {Request, Response} from 'express';
import UsersApi from '../../db/Users/users';
import ErrorHandler from '../../error';

export default class ControllerUsers extends ErrorHandler {
  constructor() {
    super();
  }

  static async add(
    req: Request,
    res: Response
  ): Promise<void> {
    const callback = async () => {
      const {name, lastname, email, login, password} = req.body;
      const result = await UsersApi.addUser({name, lastname, email, login, password});
      const status = typeof result === 'string' ? 409 : 200;
      res.status(status).json(result);
    };

    await super.provider(req, res, callback);
  }
}