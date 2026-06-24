import e from 'express';
import { createNote, deleteNoteById, editNoteById, getNoteById, getNotes } from '../controller.js';
import { validate, validateQuery } from '../../../middlewares/validate.js';
import { notePayloadSchema, noteQuerySchema } from '../validator/schema.js';

const router = e.Router();

router.get('/notes', validateQuery(noteQuerySchema), getNotes);
router.get('/notes/:id', getNoteById);
router.post('/notes', validate(notePayloadSchema), createNote);
router.put('/notes/:id', validate(notePayloadSchema), editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;
