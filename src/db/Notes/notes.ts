import {connect} from 'mongoose';
import Note from '../../models/Notes/notes';
import * as dotenv from 'dotenv';
import {Options, NoteAddInterface, NoteEditInterface} from '../types';

dotenv.config();

const defaultOptions: Options = {
  dbName: process.env.MONGO_DB_NAME || 'test',
};

export default class NotesApi {
  static async init(url = process.env.MONGOCLOUD_URL, options = defaultOptions) {
    await connect(url, options);
  }

  static async addNote({note, date}: NoteAddInterface) {
    const noteDocument = new Note({
      note,
      date: typeof date === 'string' ? new Date(date) : new Date(),
      timestamp: new Date(),
      isEdited: false,
      edits: [],
    });
    return await noteDocument.save(); // probably return required
  }

  static async editNote({note, date, id}: NoteEditInterface) {
    const prevNote = await Note.findById(id);
    if (!prevNote) {
      return null;
    }
    const timestamp = new Date();
    const updatedNote = {
      note,
      date: typeof date === 'string' ? new Date(date) : new Date(),
      timestamp,
      isEdited: true,
      edits: [...prevNote.edits, {note: prevNote.note, date: prevNote.date, timestamp: prevNote.timestamp}]
    };
    await Note.findByIdAndUpdate(id, updatedNote);

    return await Note.findById(id);
  }

  static async getNote(id: string) {
    return await Note.findById(id);
  }

  static async getNotes() {
    return await Note.find({});
  }

  static async deleteNote(id: string) {
    return await Note.deleteOne({_id: id});
  }
}
