import app from '../../app';
import * as request from 'supertest';
import {expect, describe, it} from '@jest/globals';
import {ExpressResult} from '../../types';
import {statusCode} from '../../utils/consts';
import {validateBody, compareResultAndExpect} from '../../utils/helpers';

const correctUserCredentials = {
  login: 'CloudIa202',
  password: 'fiufiu202'
};

const correctUserToAdd = {
  name: 'John',
  lastname: 'Doe',
  email: 'H4ppyCl0ud@gmail.com',
  login: 'H4ppyCl0ud',
  password: 'S3cUr3P4ssw0rd'
};

const expectedUserType = {
	_id: 'string',
	name: 'string',
	email: 'string',
	login: 'string',
	lastname: 'string',
	password: 'string',
	createdAt: 'string',
	updatedAt: 'string',
}

describe('/users route [SUCCESS]', () => {
  it('[POST] /login', async () => {
    const res: ExpressResult = await request(app).post('/users/login').send(correctUserCredentials);

    expect(res.statusCode).toEqual(statusCode.ok);
    expect(res.body).toEqual(true);
  });

  it('[POST], [DELETE] /new, /:id', async () => {
    const resPost: ExpressResult = await request(app).post('/users/new').send(correctUserToAdd);

    expect(resPost.statusCode).toEqual(statusCode.created);
    validateBody(expectedUserType, resPost.body);
    compareResultAndExpect(resPost.body, correctUserToAdd);

  });
});

