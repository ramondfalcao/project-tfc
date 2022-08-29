import { IMatch, IMatchUpdate } from '../interfaces/IMatch';
import Match from '../database/models/match';
import Teams from '../database/models/team';

class MatchService {
  public modelMatch;
  constructor() {
    this.modelMatch = Match;
  }

  public list = async () => {
    const result: IMatch[] = await this.modelMatch.findAll({ include: [
      {
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
    ] });
    return result;
  };

  public create = async (match: Match) => {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      console.log('teste');
      const err = new Error('It is not possible to create a match with two equal teams');
      err.name = 'Unauthorized';
      throw err;
    }
    const homeTeamId = await Teams.findByPk(homeTeam);
    const awayTeamId = await Teams.findByPk(awayTeam);
    if (!homeTeamId || !awayTeamId) {
      const err = new Error('There is no team with such id!');
      err.name = 'NotFoundError';
      throw err;
    }
    const result = await this.modelMatch.create({ ...match, inProgress: true });
    return result;
  };

  public updateMatchFinish = async (id: number) => {
    const result = await this.modelMatch.update({ inProgress: false }, { where: { id } });
    return result;
  };

  public updateMatchInProgress = async (matchUpdate: IMatchUpdate) => {
    const { id, homeTeamGoals, awayTeamGoals } = matchUpdate;
    const result = await this.modelMatch.update({
      homeTeamGoals, awayTeamGoals }, { where: { id } });
    return result;
  };
}

export default MatchService;
