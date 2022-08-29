import IMatch from '../interfaces/IMatch';
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
}

export default MatchService;
