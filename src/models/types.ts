interface SingleNote {
  note: string;
  date: Date;
}

export interface NoteInterface extends SingleNote {
  isEdited: boolean;
}

export interface FullNoteInterFace extends NoteInterface {
  edits: Array<SingleNote>;
}

export interface UserInterface {
  name: string;
  lastname: string;
  email: string;
  login: string;
  password: string;
}
