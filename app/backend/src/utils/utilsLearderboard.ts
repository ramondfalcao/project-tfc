import Match from '../database/models/match';
import Teams from '../database/models/team';

class UtilsLearderboard {
  modelTeams = Teams;
  static calcTotalPoints(match: Match[]): number {
    const result = match
      .reduce((acc: number, curr: { homeTeamGoals: number; awayTeamGoals: number; }) => {
        let totalPoints = acc;
        const { homeTeamGoals, awayTeamGoals } = curr;
        if (homeTeamGoals > awayTeamGoals) {
          totalPoints += 3;
        } else if (homeTeamGoals === awayTeamGoals) {
          totalPoints += 1;
        }
        return totalPoints;
      }, 0);

    return result;
  }

  static calcTotalWins(match: Match[]): number {
    const result = match.reduce((acc, curr) => {
      let totalWins = acc;
      const { homeTeamGoals, awayTeamGoals } = curr;
      if (homeTeamGoals > awayTeamGoals) {
        totalWins += 1;
      }
      return totalWins;
    }, 0);
    return result;
  }

  static calcTotalDraws(match: Match[]): number {
    const result = match.reduce((acc, curr) => {
      let totalDraws = acc;
      const { homeTeamGoals, awayTeamGoals } = curr;
      if (homeTeamGoals === awayTeamGoals) {
        totalDraws += 1;
      }
      return totalDraws;
    }, 0);
    return result;
  }

  static calcTotalLosses(match: Match[]): number {
    const result = match.reduce((acc, curr) => {
      let totalLosses = acc;
      const { homeTeamGoals, awayTeamGoals } = curr;
      if (homeTeamGoals < awayTeamGoals) {
        totalLosses += 1;
      }
      return totalLosses;
    }, 0);
    return result;
  }

  static calcGoalsFavor(match: Match[]): number {
    let goalFavor = 0;
    match.forEach((el) => {
      goalFavor += el.homeTeamGoals;
    });
    return goalFavor;
  }

  static calcGoalsOwn(match: Match[]): number {
    let goalOwn = 0;
    match.forEach((el) => {
      goalOwn += el.awayTeamGoals;
    });
    return goalOwn;
  }

  static calcGoalsBalance(match: Match[]): number {
    let goalFavor = 0;
    let goalOwn = 0;
    match.forEach((el) => {
      goalOwn += el.awayTeamGoals;
      goalFavor += el.homeTeamGoals;
    });
    const goalsBalance = goalFavor - goalOwn;
    return goalsBalance;
  }

  static calcEfficiency(points: number, games: number) {
    return Number(((points / (games * 3)) * 100).toFixed(2));
  }
}

export default UtilsLearderboard;
