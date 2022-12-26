import {Router} from 'express';
import ControllerNotes from '../controllers/Notes/notes';

const router = Router();

router.get('/', ControllerNotes.getAll);
router.get('/:id', ControllerNotes.getById);
router.post('/', ControllerNotes.add);
router.put('/:id', ControllerNotes.edit);
router.delete('/:id', ControllerNotes.deleteById);

export default router;