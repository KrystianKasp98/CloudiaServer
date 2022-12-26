import app from './app';
import * as request from 'supertest';
import {expect, describe, it} from '@jest/globals';

const expectedNoteType = {
  _id: 'string',
  note: 'string',
  date: 'string',
  timestamp: 'string',
  edits: 'object',
  isEdited: 'boolean',
}

const expectedStatusCode = {
  ok: 200,
  badRequest: 400,
  notFound: 404,
}

const validateBody = (expectedType: object, body: object) => {
    for (const [key, value] of Object.entries(expectedType)) {
      expect(typeof body[key]).toEqual(value);
    }
};

const compareResultAndExpect = (body: object, expectedResult: object) => {
  for (const [key, value] of Object.entries(expectedResult)) {
    expect(body[key]).toEqual(value);
  }
};

describe('/ route', () => {
  it('/ [SUCCESS]', async () => {
    const res = await request(app).get('/');
    const expectedBody = {message: 'Hi from CloudiaServer'};

    expect(res.statusCode).toEqual(expectedStatusCode.ok);
    expect(res.body).toEqual(expectedBody);
  });

  it('/ [FAIL]', async () => {
    const res = await request(app).get('/fail');
    const expectedText = 'Bad request';
    
    expect(res.statusCode).toEqual(expectedStatusCode.notFound);
    expect(res.text).toEqual(expectedText);
  });
});

describe('/notes route [SUCCESS]', () => {
  it('[GET] /', async () => {
    const res = await request(app).get('/notes');

    expect(res.statusCode).toEqual(expectedStatusCode.ok);
    expect(Array.isArray(res.body)).toEqual(true);
  });

  it('[GET] /:id', async () => {
    const res = await request(app).get('/notes/63a24fa71e33c4ef5943a37b');

    expect(res.statusCode).toEqual(expectedStatusCode.ok);
    validateBody(expectedNoteType, res.body);
  });

  it('[POST], [PUT], [DELETE] /', async () => {
    const inputPostBody = {note: 'I <3 CloudiaServer', date: '2022-12-26T22:19:56.945Z'};
    const resPost = await request(app).post('/notes').send(inputPostBody);
    
    expect(resPost.statusCode).toEqual(expectedStatusCode.ok);
    validateBody(expectedNoteType, resPost.body);
    compareResultAndExpect(resPost.body, inputPostBody);

    const noteId = resPost.body._id;
    const inputPutBody = {note: 'I <3 CloudiaServer much more as before'};
    const resPut = await request(app).put(`/notes/${noteId}`).send(inputPutBody);

    expect(resPut.statusCode).toEqual(expectedStatusCode.ok);
    validateBody(expectedNoteType, resPut.body);
    compareResultAndExpect(resPut.body, inputPutBody);

    const expectedDeleteBody = {acknowledged: true, deletedCount: 1};
    const resDelete = await request(app).delete(`/notes/${noteId}`);

    expect(resDelete.statusCode).toEqual(expectedStatusCode.ok);
    compareResultAndExpect(resDelete.body, expectedDeleteBody);

  });
});

describe('/notes route [FAIL]', () => {
  it('[GET] /:id, bad id', async () => {
    const res = await request(app).get('/notes/wrongid');
    const expectedResult = null;

    expect(res.statusCode).toEqual(expectedStatusCode.notFound);
    expect(res.body.result).toEqual(expectedResult);
  });

  it('[POST] /, empty note', async () => {
    const res = await request(app).post('/notes').send({note: ''});
    
    expect(res.statusCode).toEqual(expectedStatusCode.badRequest);
  });

  it('[PUT] /:id, empty note', async () => {
    const res = await request(app).put('/notes/63a24fa71e33c4ef5943a37b').send({note: ''});
    
    expect(res.statusCode).toEqual(expectedStatusCode.badRequest);
  });

  it('[PUT] /:id, bad id', async () => {
    const res = await request(app).put('/notes/wrongid').send({note: 'wrong id'});
    
    expect(res.statusCode).toEqual(expectedStatusCode.notFound);
  });

  it('[DELETE] /:id, bad id', async () => {
    const res = await request(app).delete('/notes/wrongid');
    
    expect(res.statusCode).toEqual(expectedStatusCode.notFound);
  });

});
