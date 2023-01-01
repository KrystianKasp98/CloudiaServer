import {Router} from 'express';
import {body} from 'express-validator';
import ControllerUsers from '../controllers/Users/users';

const router = Router();

router.post(
  '/',
  ControllerUsers.add
);

export default router;