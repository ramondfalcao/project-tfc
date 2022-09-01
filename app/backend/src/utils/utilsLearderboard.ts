import Match from '../database/models/match';

class UtilsLearderboard {
  static calcTotalPoints(match: Match[], homeOrAway: string): number {
    const result = match
      .reduce((acc: number, curr: { homeTeamGoals: number; awayTeamGoals: number; }) => {
        let totalPoints = acc;
        const { homeTeamGoals, awayTeamGoals } = curr;
        if (homeOrAway === 'home' && homeTeamGoals > awayTeamGoals) {
          totalPoints += 3;
        } else if (homeOrAway === 'home' && homeTeamGoals === awayTeamGoals) {
          totalPoints += 1;
        }

        if (homeOrAway === 'away' && awayTeamGoals > homeTeamGoals) {
          totalPoints += 3;
        } else if (homeOrAway === 'away' && awayTeamGoals === homeTeamGoals) {
          totalPoints += 1;
        }
        return totalPoints;
      }, 0);

    return result;
  }

  static calcTotalWins(match: Match[], homeOrAway: string): number {
    const result = match.reduce((acc, curr) => {
      let totalWins = acc;
      const { homeTeamGoals, awayTeamGoals } = curr;
      if (homeOrAway === 'home' && homeTeamGoals > awayTeamGoals) {
        totalWins += 1;
      }

      if (homeOrAway === 'away' && awayTeamGoals > homeTeamGoals) {
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

  static calcTotalLosses(match: Match[], homeOrAway: string): number {
    const result = match.reduce((acc, curr) => {
      let totalLosses = acc;
      const { homeTeamGoals, awayTeamGoals } = curr;
      if (homeOrAway === 'home' && homeTeamGoals < awayTeamGoals) {
        totalLosses += 1;
      }

      if (homeOrAway === 'away' && awayTeamGoals < homeTeamGoals) {
        totalLosses += 1;
      }
      return totalLosses;
    }, 0);
    return result;
  }

  static calcGoalsFavor(match: Match[], homeOrAway: string): number {
    let goalFavor = 0;
    match.forEach((el) => {
      if (homeOrAway === 'home') goalFavor += el.homeTeamGoals;
      if (homeOrAway === 'away') goalFavor += el.awayTeamGoals;
    });
    return goalFavor;
  }

  static calcGoalsOwn(match: Match[], homeOrAway: string): number {
    let goalOwn = 0;
    match.forEach((el) => {
      if (homeOrAway === 'away') goalOwn += el.homeTeamGoals;
      if (homeOrAway === 'home') goalOwn += el.awayTeamGoals;
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
