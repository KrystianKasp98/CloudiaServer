import {connect} from 'mongoose';
import Note from '../../models/Notes/notes';
import * as dotenv from 'dotenv';
import { Options, NoteInterface, NoteEditInterface } from '../types';

dotenv.config();

const defaultOptions: Options = {
  dbName: process.env.MONGO_DB_NAME || 'test',
};

export default class NotesApi {
  static async init(url=process.env.MONGOCLOUD_URL, options=defaultOptions) {
    await connect(url, options);
  }

  static async addNote({note, date}: NoteInterface) {
    const noteDocument = new Note({
      note,
      date: date ? new Date(date) : new Date(),
      timestamp: new Date()
    });
    return await noteDocument.save(); // probably return required
  }

  static async editNote({ note, date, id }: NoteEditInterface) {
    const timestamp = new Date();
    return Note.findByIdAndUpdate(id, date ? { note, date, timestamp } : { note, timestamp });
  }

  static async getNote(id: string) {
    return await Note.findById(id);
  }

  static async getNotes() {
    return await Note.find({});
  }

  static async deleteNote(id: string) {
    return await Note.deleteOne({ _id: id });
  }
}
