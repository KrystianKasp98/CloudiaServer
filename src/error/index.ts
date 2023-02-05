import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as dotenv from 'dotenv';

import { RESPONSE_TEXT, statusCode, FORBIDDEN_PATHS } from '../utils/consts';

dotenv.config();

export default class ErrorHandler {
  static async provider(req: Request, res: Response, callback) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json({ errors: errors.array() });
      }
      await callback(req, res);
    } catch (err) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  static badRequest(req: Request, res: Response) {
    res.status(statusCode.NOT_FOUND).send(RESPONSE_TEXT.BAD_REQUEST);
  }

  static sessionValidation(req: any, res: Response, next: NextFunction) {
    const isPathForbidden = FORBIDDEN_PATHS.some(path =>
      req.url.includes(path)
    );
    if (isPathForbidden) {
      if (
        req.session.authenticated ||
        req.headers?.apikey === process.env.API_KEY
      ) {
        next();
      } else {
        res.status(statusCode.FORBIDDEN).send(RESPONSE_TEXT.AUTH_FAILED);
      }
    } else {
      next();
    }
  }
}
