interface TeamHome {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean
}

interface LeaderboardInterface {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  totalFavor: number,
  totalOwn: number,
  goalsBalance: number,
  efficiency: number
}

export {
  TeamHome,
  LeaderboardInterface,
};
