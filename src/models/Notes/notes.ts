import {Schema, model} from 'mongoose';
import {FullNoteInterFace} from '../types';

const noteSchema = new Schema<FullNoteInterFace>({
  note: {type: String, required: true},
  date: {type: Date, required: true},
  timestamp: { type: Date, required: true },
  isEdited: { type: Boolean, required: true },
  edits: {
    type: [{note: String, date: Date, timestamp: Date}],
    required: true
  }
});

const Note = model<FullNoteInterFace>('Note', noteSchema);

export default Note;
