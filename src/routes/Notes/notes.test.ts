import app from '../../app';
import * as request from 'supertest';
import {expect, describe, it} from '@jest/globals';
import {ExpressResult} from '../../types';
import {statusCode, PATHS} from '../../utils/consts';
import {validateBody, compareResultAndExpect} from '../../utils/helpers';


const expectedNoteType = {
  _id: 'string',
  note: 'string',
  date: 'string',
  edits: 'object',
  isEdited: 'boolean',
};

describe('/notes route [SUCCESS]', () => {
  it('[GET] /', async () => {
    const res: ExpressResult = await request(app).get(PATHS.NOTES);

    expect(res.statusCode).toEqual(statusCode.OK);
    expect(Array.isArray(res.body)).toEqual(true);
  });

  it('[GET] /:id', async () => {
    const res: ExpressResult = await request(app).get(`${PATHS.NOTES}/63b2113f34a43c394fe21f5e`);

    expect(res.statusCode).toEqual(statusCode.OK);
    validateBody(expectedNoteType, res.body);
  });

  it('[POST], [PUT], [DELETE] /', async () => {
    const inputPostBody = {note: 'I <3 CloudiaServer', date: '2022-12-26T22:19:56.945Z'};
    const resPost: ExpressResult = await request(app).post(PATHS.NOTES).send(inputPostBody);

    expect(resPost.statusCode).toEqual(statusCode.CREATED);
    validateBody(expectedNoteType, resPost.body);
    compareResultAndExpect(resPost.body, inputPostBody);

    const noteId = resPost.body._id;
    const inputPutBody = {note: 'I <3 CloudiaServer much more as before'};
    const resPut: ExpressResult = await request(app).put(`${PATHS.NOTES}/${noteId}`).send(inputPutBody);

    expect(resPut.statusCode).toEqual(statusCode.OK);
    validateBody(expectedNoteType, resPut.body);
    compareResultAndExpect(resPut.body, inputPutBody);

    const expectedDeleteBody = {acknowledged: true, deletedCount: 1};
    const resDelete: ExpressResult = await request(app).delete(`${PATHS.NOTES}/${noteId}`);

    expect(resDelete.statusCode).toEqual(statusCode.OK);
    compareResultAndExpect(resDelete.body, expectedDeleteBody);
  });
});

describe('/notes route [FAIL]', () => {
  it('[GET] /:id, bad id', async () => {
    const res: ExpressResult = await request(app).get(`${PATHS.NOTES}/wrongid`);

    expect(res.statusCode).toEqual(statusCode.NOT_FOUND);
  });

  it('[POST] /, empty note', async () => {
    const res: ExpressResult = await request(app).post(PATHS.NOTES).send({note: ''});

    expect(res.statusCode).toEqual(statusCode.BAD_REQUEST);
  });

  it('[PUT] /:id, empty note', async () => {
    const res: ExpressResult = await request(app).put(`${PATHS.NOTES}/63a24fa71e33c4ef5943a37b`).send({note: ''});

    expect(res.statusCode).toEqual(statusCode.BAD_REQUEST);
  });

  it('[PUT] /:id, bad id', async () => {
    const res: ExpressResult = await request(app).put(`${PATHS.NOTES}/wrongid`).send({note: 'wrong id'});

    expect(res.statusCode).toEqual(statusCode.NOT_FOUND);
  });

  it('[DELETE] /:id, bad id', async () => {
    const res: ExpressResult = await request(app).delete(`${PATHS.NOTES}/wrongid`);

    expect(res.statusCode).toEqual(statusCode.NOT_FOUND);
  });
});
