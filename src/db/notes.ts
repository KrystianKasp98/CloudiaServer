import {connect} from 'mongoose';
import Note from '../models/notes';
import * as dotenv from 'dotenv';
import { Options } from './types';

dotenv.config();

const defaultOptions: Options = {
  dbName: process.env.MONGO_DB_NAME || 'test',
};

export default class NotesApi {
  static async init(url=process.env.MONGOCLOUD_URL, options=defaultOptions) {
    await connect(url, options);
  }

  static async addNote(note: string) {
    const noteDocument = new Note({
      note,
      date: new Date(),
    });
    return await noteDocument.save(); // probably return required
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
