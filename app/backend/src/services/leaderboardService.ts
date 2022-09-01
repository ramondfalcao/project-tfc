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

  public generateLeaderboardHome = async (data: any[]) => {
    const leaderboard = data.map((el) => {
      const points = UtilsLearderboard.calcTotalPoints(el.homeMatches, 'home');
      return {
        name: el.teamName,
        totalPoints: UtilsLearderboard.calcTotalPoints(el.homeMatches, 'home'),
        totalGames: el.homeMatches.length,
        totalVictories: UtilsLearderboard.calcTotalWins(el.homeMatches, 'home'),
        totalDraws: UtilsLearderboard.calcTotalDraws(el.homeMatches),
        totalLosses: UtilsLearderboard.calcTotalLosses(el.homeMatches, 'home'),
        goalsFavor: UtilsLearderboard.calcGoalsFavor(el.homeMatches, 'home'),
        goalsOwn: UtilsLearderboard.calcGoalsOwn(el.homeMatches, 'home'),
        goalsBalance: UtilsLearderboard.calcGoalsBalance(el.homeMatches),
        efficiency: UtilsLearderboard.calcEfficiency(points, el.homeMatches.length),
      };
    });

    const rankingLeaderboard = LeaderboardService.tiebreaker(leaderboard);
    return rankingLeaderboard;
  };

  public generateLeaderboardAway = async (data: any[]) => {
    const leaderboard = data.map((el) => {
      const points = UtilsLearderboard.calcTotalPoints(el.awayMatches, 'away');
      return {
        name: el.teamName,
        totalPoints: UtilsLearderboard.calcTotalPoints(el.awayMatches, 'away'),
        totalGames: el.awayMatches.length,
        totalVictories: UtilsLearderboard.calcTotalWins(el.awayMatches, 'away'),
        totalDraws: UtilsLearderboard.calcTotalDraws(el.awayMatches),
        totalLosses: UtilsLearderboard.calcTotalLosses(el.awayMatches, 'away'),
        goalsFavor: UtilsLearderboard.calcGoalsFavor(el.awayMatches, 'away'),
        goalsOwn: UtilsLearderboard.calcGoalsOwn(el.awayMatches, 'away'),
        goalsBalance: UtilsLearderboard.calcGoalsBalance(el.awayMatches),
        efficiency: UtilsLearderboard.calcEfficiency(points, el.awayMatches.length),
      };
    });

    const rankingLeaderboard = LeaderboardService.tiebreaker(leaderboard);
    return rankingLeaderboard;
  };

  public list = async (leaderboard: string) => {
    const homeTeams = await this.modelTeams
      .findAll({ include: [
        { model: Match, as: 'homeMatches', where: { inProgress: false } },
      ] });

    const awayTeams = await this.modelTeams
      .findAll({ include: [
        { model: Match, as: 'awayMatches', where: { inProgress: false } },
      ] });

    if (leaderboard === 'home') return this.generateLeaderboardHome(homeTeams);

    if (leaderboard === 'away') return this.generateLeaderboardAway(awayTeams);
  };
}

export default LeaderboardService;
