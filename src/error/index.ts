import {Request, Response} from 'express';
import {validationResult} from 'express-validator';

export default class ErrorHandler {
  static async provider(req: Request, res: Response, callback) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
      await callback(req, res);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static badRequest(req: Request, res: Response) {
    res.status(404).send('Bad request');
  }
}
