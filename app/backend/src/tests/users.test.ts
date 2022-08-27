import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../interfaces/IUser';
import IUserLogin from '../interfaces/IUserLogin';
import Users from '../database/models/user';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: User = {
  id: 1,
  username: 'Claúdio',
  role: 'admin',
  email: 'claudio@admin.com',
  password: '32341214',
}

const userLoginMock: IUserLogin = {
  email: 'claudio@admin.com',
  password: '32341214'
}

const wrongLogin: IUserLogin = {
  email: 'jose@admin.com',
  password: '231234'
}

describe('User and Login', () => {
  it('Is it possible to login correctly', async () => {
    sinon.stub(Users, 'findOne').resolves(userMock as Users)
    const response = await chai.request(app).post('/login').send(userLoginMock);
    expect(response.status).to.be.eq(200);
    sinon.restore()
  });
});

// describe('Failed Login', () => {
//   it('Return status 401', async () => {
//     const response = await chai.request(app).post('/login').send(wrongLogin);
//     expect(response.status).to.be.eq(401);
//     sinon.restore()
//   });
// });
