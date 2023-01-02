import app from './app';
import * as request from 'supertest';
import {expect, describe, it} from '@jest/globals';
import {ExpressResult} from './types';
import {statusCode, responseText} from './utils/consts';

describe('/ route', () => {
  it('/ [SUCCESS]', async () => {
    const res: ExpressResult = await request(app).get('/');
    const expectedBody = {message: 'Hi from CloudiaServer'};

    expect(res.statusCode).toEqual(statusCode.ok);
    expect(res.body).toEqual(expectedBody);
  });

  it('/ [FAIL]', async () => {
    const res: ExpressResult = await request(app).get('/fail');
    const expectedText = responseText.badRequest;

    expect(res.statusCode).toEqual(statusCode.notFound);
    expect(res.text).toEqual(expectedText);
  });
});
