import {Router} from 'express';
import {body} from 'express-validator';
import ControllerNotes from '../../controllers/Notes/notes';

const router = Router();

router.get('/', ControllerNotes.getAll);
router.get('/:id', ControllerNotes.getById);
router.post(
  '/',
  body('note').isLength({min: 1}),
  ControllerNotes.add
);
router.put(
  '/:id',
  body('note').isLength({min: 1}),
  ControllerNotes.edit
);
router.delete('/:id', ControllerNotes.deleteById);

export default router;
