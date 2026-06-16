import e from 'express';
import { createNote, deleteNoteById, editNoteById, getNoteById, getNotes } from '../controller.js';

const router = e.Router();

router.get('/notes', getNotes);
router.get('/notes/:id', getNoteById);
router.post('/notes', createNote);
router.put('/notes/:id', editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;
