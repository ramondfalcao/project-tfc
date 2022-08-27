import ITeam from '../interfaces/ITeam';
import Teams from '../database/models/team';

class TeamService {
  public modelTeams;
  constructor() {
    this.modelTeams = Teams;
  }

  public list = async () => {
    const result = await this.modelTeams.findAll() as ITeam[];
    return result;
  };

  public findById = async (id: number) => {
    const result = await this.modelTeams.findByPk(id);
    return result;
  };
}

export default TeamService;
