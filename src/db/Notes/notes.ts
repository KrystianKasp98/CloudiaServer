import ApiBase from '../apiBase';
import Note from '../../models/Notes/notes';
import { NoteAddInterface, NoteEditInterface } from '../types';

export default class NotesApi extends ApiBase {
  static async addNote({ note, date }: NoteAddInterface) {
    const noteDocument = new Note({
      note,
      date: typeof date === 'string' ? new Date(date) : new Date(),
      isEdited: false,
      edits: []
    });
    return noteDocument.save(); // probably return required
  }

  static async editNote({ note, date, id }: NoteEditInterface) {
    const prevNote = await Note.findById(id);
    if (!prevNote) {
      return null;
    }
    const updatedNote = {
      note,
      date: typeof date === 'string' ? new Date(date) : new Date(),
      isEdited: true,
      edits: [...prevNote.edits, { note: prevNote.note, date: prevNote.date }]
    };
    await Note.findByIdAndUpdate(id, updatedNote);

    return Note.findById(id);
  }

  static async getNote(id: string) {
    return Note.findById(id);
  }

  static async getNotes() {
    return Note.find({}).sort({ date: -1 });
  }

  static async deleteNote(id: string) {
    return Note.deleteOne({ _id: id });
  }
}
