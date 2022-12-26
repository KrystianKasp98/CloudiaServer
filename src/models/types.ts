interface SingleNote {
  note: string;
  date: Date;
  timestamp: Date;
}

export interface NoteInterface extends SingleNote{
  isEdited: boolean;
}

export interface FullNoteInterFace extends NoteInterface{
  edits: Array<SingleNote>
}
