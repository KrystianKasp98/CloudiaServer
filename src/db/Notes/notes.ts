import { connect, connection } from 'mongoose';
import * as dotenv from 'dotenv';

import Note from '../../models/Notes/notes';
import { Options, NoteAddInterface, NoteEditInterface } from '../types';

dotenv.config();

const defaultOptions: Options = {
  dbName: process.env.MONGO_DB_NAME || 'test'
};

export default class NotesApi {
  static async init(
    url = process.env.MONGOCLOUD_URL,
    options = defaultOptions
  ) {
    await connect(url, options);
  }

  static disconect() {
    connection.close();
  }

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
