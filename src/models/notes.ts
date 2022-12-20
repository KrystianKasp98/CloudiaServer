import {Schema, model} from 'mongoose';
import { NoteInterface } from './types';

const noteSchema = new Schema<NoteInterface>({
  note: {type: String, required: true},
  date: {type: Date, required: true},
});

const Note = model<NoteInterface>('Note', noteSchema);

export default Note;
