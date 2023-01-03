export interface Options {
  dbName: string
}

export interface NoteAddInterface {
  note: string,
  date?: string
}

export interface NoteEditInterface extends NoteAddInterface {
  id: string,
}

export interface UserLoginInterface {
  login: string,
  password: string,
}

export interface UserAddInterface extends UserLoginInterface {
  name: string,
  lastname: string,
  email: string,
}
