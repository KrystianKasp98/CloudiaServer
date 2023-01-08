import app from './app';
import * as request from 'supertest';
import {expect, describe, it} from '@jest/globals';
import {ExpressResult} from './types';
import {statusCode, RESPONSE_TEXT} from './utils/consts';

describe('/ route', () => {
  it('/ [SUCCESS]', async () => {
    const res: ExpressResult = await request(app).get('/');
    const expectedBody = {message: 'Hi from CloudiaServer'};

    expect(res.statusCode).toEqual(statusCode.OK);
    expect(res.body).toEqual(expectedBody);
  });

  it('/ [FAIL]', async () => {
    const res: ExpressResult = await request(app).get('/fail');
    const expectedText = RESPONSE_TEXT.BAD_REQUEST;

    expect(res.statusCode).toEqual(statusCode.NOT_FOUND);
    expect(res.text).toEqual(expectedText);
  });
});
