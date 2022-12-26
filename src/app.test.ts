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
  notFound: 404,
}

const validateBody = (expectedType: object, body: object) => {
    for (const [key, value] of Object.entries(expectedType)) {
      expect(typeof body[key]).toEqual(value);
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

});

describe('/notes route [FAIL]', () => {
  it('[GET] /:id', async () => {
    const res = await request(app).get('/notes/wrongid');
    const expectedResult = null;

    expect(res.statusCode).toEqual(expectedStatusCode.notFound);
    expect(res.body.result).toEqual(expectedResult);
  });
});
