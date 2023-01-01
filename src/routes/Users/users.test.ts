import app from '../../app';
import * as request from 'supertest';
import {expect, describe, it} from '@jest/globals';
import {ExpressResult} from '../../types';
import {statusCode} from '../../utils/consts';
import {validateBody, compareResultAndExpect} from '../../utils/helpers';

const userCredentials = {
  login: 'CloudIa202',
  password: 'fiufiu202'
}

describe('/users route [SUCCESS]', () => {
  it('[POST] /login', async () => {
    const res: ExpressResult = await request(app).post('/users/login').send(userCredentials);

    expect(res.statusCode).toEqual(statusCode.ok);
    expect(res.body).toEqual(true);
  });
});

