import {Request, Response} from 'express';
import NotesApi from '../db/notes';
import ErrorHandler from '../error';

export default class ControllerNotes extends ErrorHandler {
  constructor() {
    super();
  }

  static async getAll(
    req: Request,
    res: Response
  ): Promise<void> {
    const callback = async () => {
      try {
        const result = await NotesApi.getNotes();
        res.status(200).json(result);
      } catch (err) {
        res.status(404);
      }
    };

    await super.provider(req, res, callback);
  }

  static async getById(
    req: Request,
    res: Response
  ): Promise<void> {
    const callback = async () => {
      try {
        const {id} = req.params;
        const result = await NotesApi.getNote(id);
        res.status(200).json(result);
      } catch (err) {
        res.status(404).json({result: false});
      }
    };

    await super.provider(req, res, callback);
  }

  static async deleteById(
    req: Request,
    res: Response
  ): Promise<void> {
    const callback = async () => {
      try {
        const {id} = req.params;
        const result = await NotesApi.deleteNote(id);
        res.status(200).json(result);
      } catch (err) {
        res.status(404).json({result: false});
      }
    };

    await super.provider(req, res, callback);
  }
}
