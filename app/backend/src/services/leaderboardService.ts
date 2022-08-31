import Teams from '../database/models/team';
import Match from '../database/models/match';
import UtilsLearderboard from '../utils/utilsLearderboard';

class LeaderboardService {
  modelTeams = Teams;

  static tiebreaker(leaderboard: any[]) {
    const result = leaderboard.sort(
      (a, b) => (b.totalPoints - a.totalPoints)
      || (b.totalVictories - a.totalVictories)
      || (b.goalsBalance - a.goalsBalance)
      || (b.goalsFavor - a.goalsFavor)
      || (b.goalsOwn - a.goalsOwn),
    );

    return result;
  }

  public generateLeaderboard = async (data: any[]) => {
    const leaderboard = data.map((el) => {
      const points = UtilsLearderboard.calcTotalPoints(el.homeMatches);
      return {
        name: el.teamName,
        totalPoints: UtilsLearderboard.calcTotalPoints(el.homeMatches),
        totalGames: el.homeMatches.length,
        totalVictories: UtilsLearderboard.calcTotalWins(el.homeMatches),
        totalDraws: UtilsLearderboard.calcTotalDraws(el.homeMatches),
        totalLosses: UtilsLearderboard.calcTotalLosses(el.homeMatches),
        goalsFavor: UtilsLearderboard.calcGoalsFavor(el.homeMatches),
        goalsOwn: UtilsLearderboard.calcGoalsOwn(el.homeMatches),
        goalsBalance: UtilsLearderboard.calcGoalsBalance(el.homeMatches),
        efficiency: UtilsLearderboard.calcEfficiency(points, el.homeMatches.length),
      };
    });

    const rankingLeaderboard = LeaderboardService.tiebreaker(leaderboard);
    return rankingLeaderboard;
  };

  public list = async () => {
    const teamsAndMatches = await this.modelTeams
      .findAll({ include: [
        { model: Match, as: 'homeMatches', where: { inProgress: false } },
        { model: Match, as: 'awayMatches', where: { inProgress: false } },
      ] });
    const result = this.generateLeaderboard(teamsAndMatches);
    return result;
  };
}

export default LeaderboardService;
