/*  eslint max-len: 0 */
// HELPER FUNCTIONS

// Creates new array of bots with their overall score added to object

function calculateOverallRating(bots) {
  const botsWithRatings = [];
  bots.forEach((bot) => {
    const currentBot = bot; // Declared currentBot because of es-lint no-param-reassign
    const skills = bot.skills;
    const overallRating = (skills.strength + skills.intelligence + skills.speed + skills.endurance + skills.firepower);
    currentBot.overallRating = overallRating;
    botsWithRatings.push(currentBot);
  });
  return botsWithRatings;
}

// Sorts each team by overallRating

function sortTeamByOverallRating(team) {
  team.sort((a, b) => parseFloat(a.overallRating) - parseFloat(b.overallRating));
  return team;
}

// Moves all bots into teams, then sorts.

function sortTeam(bots, team) {
  const currentTeam = [];
  if (bots) {
    bots.forEach((bot) => {
      if (bot.team === team) {
        currentTeam.push(bot);
      }
    });
  }
  if (currentTeam) {
    const sortedTeam = sortTeamByOverallRating(currentTeam);
    return sortedTeam;
  } return false;
}

// Error checking to make sure there are both teams present

function checkBothTeamsExist(team1, team2) {
  if (team1 && team2 && team1.length && team2.length) {
    return true;
  }
  return false;
}

// Checks to see if a bot should run or not.

function shouldFirstBotRun(bot1, bot2) {
  if (((bot2.skills.courage - bot1.skills.courage) >= 4) && (bot2.skills.strength - bot1.skills.strength) >= 3) {
    return true;
  }
  return false;
}

function shouldSecondBotRun(bot1, bot2) {
  if (((bot1.skills.courage - bot2.skills.courage) >= 4) && (bot1.skills.strength - bot2.skills.strength) >= 3) {
    return true;
  }
  return false;
}

// Checks to see if anyone lost the battle after fighting

function checkLoser(bot1, bot2) {
  if (bot1.skills.strength - bot2.skills.strength >= 3) {
    return true;
  }
  return false;
}

// Moves the survivor names into a string to be returned part of the final return statement in the battle.

function determineSurvivors(survivors) {
  let survivorsNames = 'no survivors';
  if (survivors.length) {
    survivorsNames = '';
    survivors.forEach((survivor) => {
      survivorsNames += `${survivor.name}, `;
    });
    survivorsNames = survivorsNames.substring(0, survivorsNames.length - 2);
  }
  return survivorsNames;
}

// Checks bot data for validations to minimize any errors.

function checkBotsForErrors(bots) {
  let err = '';
  for (let index = 0; index < bots.length; index += 1) {
    const bot = bots[index];
    if (!bot.name) {
      err = 'a bot has no name';
      return err;
    } else if (!(bot.team === 'Autobot' || bot.team === 'Deceptacon')) {
      err = `bot ${bot.name} has incorrect team.`;
      return err;
    } else if (!bot.skills) {
      err = `bot ${bot.name} has no skills.`;
      return err;
    } else if (!(bot.skills.strength && bot.skills.intelligence && bot.skills.speed && bot.skills.endurance && bot.skills.firepower && bot.skills.courage && bot.skills.skill && bot.skills.rank)) {
      err = `bot ${bot.name} is missing a skill.`;
      return err;
    }
  }
  return false;
}

// Checks to see if the fighting bot is a 'super bot'

function isBotSuperBot(bot) {
  const botName = bot.name;
  const superBotNames = ['Optimus Prime', 'Predaking'];
  for (let index = 0; index < superBotNames.length; index += 1) {
    const superBotName = superBotNames[index];
    if (botName === superBotName) {
      return true;
    }
  }
  return false;
}

function areBothTeamsStillAlive(autobots, deceptacons) {
  if (autobots.length > 0 && deceptacons.length > 0) {
    return true;
  }
  return false;
}

function battleNumberLessThanMax(round, maxRounds) {
  if (round < maxRounds) {
    return true;
  }
  return false;
}

function killFirstBot(bots) {
  bots.shift();
  return bots;
}

function generateReportFromBattle(autobotScore, deceptaconScore, autobots, deceptacons, battleNumber) {
  let winningTeamName;
  let winningSurvivors;
  let losingTeamName;
  let losingSurvivors;
  let tieGame;
  let tieGameSurvivors;

  if (autobotScore > deceptaconScore) {
    winningTeamName = 'Autobots';
    winningSurvivors = determineSurvivors(autobots);
    losingTeamName = 'Deceptacons';
    losingSurvivors = determineSurvivors(deceptacons);
  } else if (deceptaconScore > autobotScore) {
    winningTeamName = 'Deceptacons';
    winningSurvivors = determineSurvivors(deceptacons);
    losingTeamName = 'Autobots';
    losingSurvivors = determineSurvivors(autobots);
  } else {
    tieGame = true;
    tieGameSurvivors = `with ${determineSurvivors(autobots)} remaining for Autobots and ${determineSurvivors(deceptacons)} remaining for Deceptacons!`;
  }

  if (tieGame) {
    return (`Battles: #${battleNumber}\nIt is a tie game ${tieGameSurvivors}`);
  }

  return (
    `Battles: #${battleNumber}\nThe winning team is the ${winningTeamName} with ${winningSurvivors} remaining\nThe losing team is the ${losingTeamName} with ${losingSurvivors} remaining`);
}

module.exports = {
  calculateOverallRating,
  sortTeam,
  checkBothTeamsExist,
  shouldFirstBotRun,
  shouldSecondBotRun,
  checkLoser,
  checkBotsForErrors,
  isBotSuperBot,
  generateReportFromBattle,
  battleNumberLessThanMax,
  areBothTeamsStillAlive,
  killFirstBot,
};
