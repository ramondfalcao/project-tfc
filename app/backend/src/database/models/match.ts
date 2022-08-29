import { Model, BOOLEAN, INTEGER } from 'sequelize';
import db from '.';
import Teams from './team';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
    onDelete: 'CASCADE',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Match.belongsTo(Teams, { foreignKey: 'home_team', targetKey: 'id', as: 'teamHome' });
Match.belongsTo(Teams, { foreignKey: 'away_team', targetKey: 'id', as: 'teamAway' });

Teams.hasMany(Match, { foreignKey: 'home_team', sourceKey: 'id', as: 'homeMatches' });
Teams.hasMany(Match, { foreignKey: 'away_team', sourceKey: 'id', as: 'awayMatches' });

export default Match;
