import {Router} from 'express';
import ControllerNotes from '../controllers/notes';

const router = Router();

router.get('/', ControllerNotes.getAll);
router.get('/:id', ControllerNotes.getById);
router.delete('/:id', ControllerNotes.deleteById);

export default router;