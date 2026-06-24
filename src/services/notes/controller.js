import { nanoid } from 'nanoid';
import notes from './notes.js';
import InvariantError from '../../exceptions/invariant-error.js';
import response from '../../utils/response.js';
import NotFoundError from '../../exceptions/not-found-error.js';

export const createNote = (req, res, next) => {
  // determine data
  const { title = 'untitled', tags, body } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // assign data to new object note
  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  // push to notes database
  notes.push(newNote);

  // check the new data is success push to the notes database
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: id });
  }

  return next(new InvariantError('Catatan gagal ditambahkan'));
};

export const getNotes = (req, res, next) => {
  const { title } = req.query;
  if (title) {
    const filteredNote = notes.filter((note) => note.title === title);
    if (filteredNote.length === 0) {
      return next(new NotFoundError('Catatan tidak ditemukan'));
    }

    return response(res, 200, 'success', { notes: filteredNote });
  }

  return response(res, 200, 'success', { notes: notes });
};

export const getNoteById = (req, res, next) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);
  if (note) {
    return response(res, 200, 'Catatan ditemukan', { note: note });
  }

  return next(new NotFoundError('Catatan tidak ditemukan'));
};

export const editNoteById = (req, res, next) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], title, tags, body, updatedAt };
    return response(res, 200, 'Catatan berhasil diperbarui', notes[index]);
  }

  return next(new NotFoundError('Catatan tidak ditemukan'));
};

export const deleteNoteById = (req, res, next) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    return response(res, 200, 'Catatan berhasil dihapus');
  }

  return next(new NotFoundError('Catatan tidak ditemukan'));
};
