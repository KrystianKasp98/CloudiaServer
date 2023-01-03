import {Router} from 'express';
import {body} from 'express-validator';
import ControllerUsers from '../../controllers/Users/users';
import {forbiddenPasswords} from '../../utils/consts';

const router = Router();

const limits = {
  name: {
    min: 3,
    max: 20,
  },
  lastname: {
    min: 3,
    max: 25,
  },
  email: {
    min: 6,
    max: 30,
  },
  login: {
    min: 6,
    max: 24,
  },
  password: {
    min: 8,
    max: 24,
  }
};

router.post(
  '/new',
  body('name').
    isLength({min: limits.name.min, max: limits.name.max}),
  body('lastname').
    isLength({min: limits.lastname.min, max: limits.lastname.max}),
  body('email').
    isEmail().
    isLength({min: limits.email.min, max: limits.email.max}),
  body('login').
    isLength({min: limits.login.min, max: limits.login.max}),
  body('password').
    not().
    isIn(forbiddenPasswords).
    withMessage('Do not use a common word as the password').
    isLength({min: limits.password.min, max: limits.password.max}),
  ControllerUsers.add
);

router.post(
  '/login',
  body('login').
    isLength({min: limits.login.min, max: limits.login.max}),
  body('password').
    isLength({min: limits.password.min, max: limits.password.max}),
  ControllerUsers.login
);

router.delete('/:id', ControllerUsers.deleteById);

export default router;
