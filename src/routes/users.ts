import {Router} from 'express';
import {body} from 'express-validator';
import ControllerUsers from '../controllers/Users/users';
import {forbiddenPasswords} from '../consts';


const router = Router();

router.post(
  '/new',
  body('name').
    isLength({min: 3, max: 20}),
  body('lastname').
    isLength({min: 3, max: 25}),
  body('email').
    isEmail().
    isLength({max: 30}),
  body('login').
    isLength({min: 6, max: 24}),
  body('password').
    not().
    isIn(forbiddenPasswords).
    withMessage('Do not use a common word as the password').
    isLength({min: 8, max: 24}),
  ControllerUsers.add
);

router.post(
  '/login',
  body('login').
    isLength({min: 6, max: 24}),
  body('password').
    isLength({min: 8, max: 24}),
  ControllerUsers.login
);

export default router;
