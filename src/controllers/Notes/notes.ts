import { Request, Response } from 'express';

import NotesApi from '../../db/Notes/notes';
import ErrorHandler from '../../error';
import { NoteAddInterface } from '../../db/types';
import { RESPONSE_TEXT, statusCode } from '../../utils/consts';

export default class ControllerNotes extends ErrorHandler {
  constructor() {
    super();
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    const callback = async () => {
      const result = await NotesApi.getNotes();
      res.status(statusCode.OK).json(result);
    };

    await super.provider(req, res, callback);
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const callback = async () => {
      try {
        const { id } = req.params;
        const result = await NotesApi.getNote(id);
        res.status(statusCode.OK).json(result);
      } catch (err: unknown) {
        res.status(statusCode.NOT_FOUND).json(err);
      }
    };

    await super.provider(req, res, callback);
  }

  static async deleteById(req: Request, res: Response): Promise<void> {
    const callback = async () => {
      try {
        const { id } = req.params;
        const result = await NotesApi.deleteNote(id);
        res.status(statusCode.OK).json(result);
      } catch (err) {
        res.status(statusCode.NOT_FOUND).json(err);
      }
    };

    await super.provider(req, res, callback);
  }

  static async add(req: Request, res: Response): Promise<void> {
    const callback = async () => {
      try {
        const { note, date }: NoteAddInterface = req.body;
        const result = await NotesApi.addNote({ note, date });
        const status =
          typeof result === 'string' ? statusCode.CONFLICT : statusCode.CREATED;
        res.status(status).json(result);
      } catch (err: unknown) {
        res.status(statusCode.NOT_FOUND).json(err);
      }
    };

    await super.provider(req, res, callback);
  }

  static async edit(req: Request, res: Response): Promise<void> {
    const callback = async () => {
      try {
        const { id } = req.params;
        const { note, date }: NoteAddInterface = req.body;
        const result = await NotesApi.editNote({ note, date, id });
        if (result === null) {
          res
            .status(statusCode.NOT_FOUND)
            .send(RESPONSE_TEXT.NOTES.noteUpdateNotFound(id));
        } else {
          res.status(statusCode.OK).json(result);
        }
      } catch (err: unknown) {
        res.status(statusCode.NOT_FOUND).json(err);
      }
    };

    await super.provider(req, res, callback);
  }
}
