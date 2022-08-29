interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface IMatchUpdate {
  id?: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export {
  IMatch,
  IMatchUpdate,
};
