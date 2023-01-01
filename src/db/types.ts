export interface Options {
  dbName: string
}

export interface NoteAddInterface {
  note: string,
  date?: string
}

export interface NoteEditInterface extends NoteAddInterface {
  id: string
}

export interface UserAddInterface {
  name: string,
  lastname: string,
  email: string,
  login: string,
  password: string,
}