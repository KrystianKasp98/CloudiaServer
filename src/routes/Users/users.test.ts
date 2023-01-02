import app from '../../app';
import * as request from 'supertest';
import {expect, describe, it} from '@jest/globals';
import {ExpressResult} from '../../types';
import {responseText, statusCode} from '../../utils/consts';
import {validateBody, compareResultAndExpect} from '../../utils/helpers';

const correctUserCredentials = {
  login: 'CloudIa202',
  password: 'fiufiu202',
};

const wrongUserCredentials = {
  login: 'wr0ngL0g1n',
  password: 'wr0ngP422w0rd',
}

const correctUserToAdd = {
  name: 'John',
  lastname: 'Doe',
  email: 'H4ppyCl0ud@gmail.com',
  login: 'H4ppyCl0ud',
  password: 'S3cUr3P4ssw0rd',
};

const existEmailUser = {
  ...correctUserToAdd, email: 'KlaudSad@gmail.com',
};

const existLoginUser = {
  ...correctUserToAdd, login: 'CloudIa202',
};

const tooShortNameUser = {
  ...correctUserToAdd, name: 'sn'
};

const tooLongNameUser = {
  ...correctUserToAdd, name: '1234567891011121314151617'
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

    const userId = resPost.body._id;

    const expectedDeleteBody = { acknowledged: true, deletedCount: 1 };
    const resDelete: ExpressResult = await request(app).delete(`/users/${userId}`);

    expect(resDelete.statusCode).toEqual(statusCode.ok);
    compareResultAndExpect(resDelete.body, expectedDeleteBody);
  });
});

describe('/users route [FAIL]', () => {
  it('[POST] /login, wrong credentials', async () => {
    const res: ExpressResult = await request(app).post('/users/login').send(wrongUserCredentials);

    expect(res.statusCode).toEqual(statusCode.forbidden);
    expect(res.body).toEqual(false);
  });

  it('[POST] /new, user`s login is exist', async () => {
    const res: ExpressResult = await request(app).post('/users/new').send(existLoginUser);

    expect(res.statusCode).toEqual(statusCode.conflict);
    expect(res.body).toEqual(responseText.users.usedLogin);
  });

  it('[POST] /new, user`s email is exist', async () => {
    const res: ExpressResult = await request(app).post('/users/new').send(existEmailUser);

    expect(res.statusCode).toEqual(statusCode.conflict);
    expect(res.body).toEqual(responseText.users.usedEmail);
  });

  it('[POST] /new, user`s name is too short', async () => {
    const res: ExpressResult = await request(app).post('/users/new').send(tooShortNameUser);

    expect(res.statusCode).toEqual(statusCode.badRequest);
  });

  it('[POST] /new, user`s name is too long', async () => {
    const res: ExpressResult = await request(app).post('/users/new').send(tooLongNameUser);

    expect(res.statusCode).toEqual(statusCode.badRequest);
  });
});
