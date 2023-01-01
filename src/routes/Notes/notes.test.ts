import app from '../../app';
import * as request from 'supertest';
import {expect, describe, it} from '@jest/globals';
import {ExpressResult} from '../../types';
import {statusCode} from '../../utils/consts';
import {validateBody, compareResultAndExpect} from '../../utils/helpers';

const expectedNoteType = {
  _id: 'string',
  note: 'string',
  date: 'string',
  timestamp: 'string',
  edits: 'object',
  isEdited: 'boolean',
};



describe('/notes route [SUCCESS]', () => {
  it('[GET] /', async () => {
    const res: ExpressResult = await request(app).get('/notes');

    expect(res.statusCode).toEqual(statusCode.ok);
    expect(Array.isArray(res.body)).toEqual(true);
  });

  it('[GET] /:id', async () => {
    const res: ExpressResult = await request(app).get('/notes/63a24fa71e33c4ef5943a37b');

    expect(res.statusCode).toEqual(statusCode.ok);
    validateBody(expectedNoteType, res.body);
  });

  it('[POST], [PUT], [DELETE] /', async () => {
    const inputPostBody = {note: 'I <3 CloudiaServer', date: '2022-12-26T22:19:56.945Z'};
    const resPost: ExpressResult = await request(app).post('/notes').send(inputPostBody);

    expect(resPost.statusCode).toEqual(statusCode.ok);
    validateBody(expectedNoteType, resPost.body);
    compareResultAndExpect(resPost.body, inputPostBody);

    const noteId = resPost.body._id;
    const inputPutBody = {note: 'I <3 CloudiaServer much more as before'};
    const resPut: ExpressResult = await request(app).put(`/notes/${noteId}`).send(inputPutBody);

    expect(resPut.statusCode).toEqual(statusCode.ok);
    validateBody(expectedNoteType, resPut.body);
    compareResultAndExpect(resPut.body, inputPutBody);

    const expectedDeleteBody = {acknowledged: true, deletedCount: 1};
    const resDelete: ExpressResult = await request(app).delete(`/notes/${noteId}`);

    expect(resDelete.statusCode).toEqual(statusCode.ok);
    compareResultAndExpect(resDelete.body, expectedDeleteBody);
  });
});

describe('/notes route [FAIL]', () => {
  it('[GET] /:id, bad id', async () => {
    const res: ExpressResult = await request(app).get('/notes/wrongid');

    expect(res.statusCode).toEqual(statusCode.notFound);
  });

  it('[POST] /, empty note', async () => {
    const res: ExpressResult = await request(app).post('/notes').send({note: ''});

    expect(res.statusCode).toEqual(statusCode.badRequest);
  });

  it('[PUT] /:id, empty note', async () => {
    const res: ExpressResult = await request(app).put('/notes/63a24fa71e33c4ef5943a37b').send({note: ''});

    expect(res.statusCode).toEqual(statusCode.badRequest);
  });

  it('[PUT] /:id, bad id', async () => {
    const res: ExpressResult = await request(app).put('/notes/wrongid').send({note: 'wrong id'});

    expect(res.statusCode).toEqual(statusCode.notFound);
  });

  it('[DELETE] /:id, bad id', async () => {
    const res: ExpressResult = await request(app).delete('/notes/wrongid');

    expect(res.statusCode).toEqual(statusCode.notFound);
  });
});
