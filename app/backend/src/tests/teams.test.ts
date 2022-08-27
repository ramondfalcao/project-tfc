import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Teams from '../database/models/team';
import ITeam from '../interfaces/ITeam';

const teamsMock: ITeam[] = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
]

const idTeamMock: ITeam = {
    "id": 1,
    "teamName": "Avaí/Kindermann"
}

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  it('is it possible to return all teams', async () => {
    sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[])
    const response = await chai.request(app).get('/teams');
    expect(response.body).to.deep.equal(teamsMock);
    sinon.restore()
  });

  it('is it possible to return a specific team', async () => {
    sinon.stub(Teams, 'findByPk').resolves(idTeamMock as Teams)
    const response = await chai.request(app).get('/teams/1');
    expect(response.body).to.deep.equal(idTeamMock);
    sinon.restore()
  });
});
