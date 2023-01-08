import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {responseText, statusCode, FORBIDDEN_PATHS} from '../utils/consts';

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
    res.status(404).send(responseText.badRequest);
  }

  static sessionValidation(req: Request, res: Response, next: NextFunction) {
    const isPathForbidden = FORBIDDEN_PATHS.some(path => req.url.includes(path));
    if (isPathForbidden) {
        // @ts-ignore
        if (req.session.authenticated) {
          next();
        } else {
          res.status(statusCode.forbidden).send(responseText.authFailed);
        }
    } else {
      next();
    }
  }
}
