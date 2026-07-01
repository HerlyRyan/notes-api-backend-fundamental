import InvariantError from '../../exceptions/invariant-error.js';
import response from '../../utils/response.js';
import NotFoundError from '../../exceptions/not-found-error.js';
import NoteRepositories from './repositories/note-repositories.js';

export const createNote = async (req, res, next) => {
  // determine data
  const { title, tags, body } = req.validated;

  const note = await NoteRepositories.createNote({ title, body, tags });

  if (note) {
    return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: note.id });
  }

  return next(new InvariantError('Catatan gagal ditambahkan'));
};

export const getNotes = async (req, res) => {
  const notes = await NoteRepositories.getNotes();
  return response(res, 200, 'success', { notes: [notes] });
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await NoteRepositories.getNoteById(id);
  if (note) {
    return response(res, 200, 'Catatan ditemukan', { note: note });
  }

  return next(new NotFoundError('Catatan tidak ditemukan'));
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { title, tags, body } = req.validated;
  const note = await NoteRepositories.editNoteById({ id, title, body, tags });

  if (note) {
    return response(res, 200, 'Catatan berhasil diperbarui', note);
  }

  return next(new NotFoundError('Catatan tidak ditemukan'));
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const deletedNote = await NoteRepositories.deleteNoteById(id);

  if (deletedNote) {
    return response(res, 200, 'Catatan berhasil dihapus');
  }

  return next(new NotFoundError('Catatan tidak ditemukan'));
};
