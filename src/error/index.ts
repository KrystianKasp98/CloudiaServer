import {Request, Response} from 'express';

export default class ErrorHandler {
  static async provider(req: Request, res: Response, callback) {
    try {
      await callback(req, res);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static badRequest(req: Request, res: Response) {
    res.status(404).send('Bad request');
  }
}
