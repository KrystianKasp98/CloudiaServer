import { Router } from 'express';
import { body } from 'express-validator';

import ControllerNotes from '../../controllers/Notes/notes';
import ErrorHandler from '../../error';

const router = Router();

if (process.env.NODE_ENV === 'production') {
  router.use(ErrorHandler.sessionValidation);
}

router.get('/', ControllerNotes.getAll);
router.get('/:id', ControllerNotes.getById);
router.post('/', body('note').isLength({ min: 1 }), ControllerNotes.add);
router.put('/:id', body('note').isLength({ min: 1 }), ControllerNotes.edit);
router.delete('/:id', ControllerNotes.deleteById);

export default router;
