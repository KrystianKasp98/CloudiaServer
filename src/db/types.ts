export interface Options {
  dbName: string
}

export interface NoteInterface {
  note: string,
  date?: string
}

export interface NoteEditInterface extends NoteInterface {
  id: string
}
