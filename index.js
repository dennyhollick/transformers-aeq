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

function shouldBotRun(bot1, bot2) {
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

// Returns the winner based on the score. In a tie, returns false.

function determineWinners(autobotScore, deceptaconScore, autobots, deceptacons) {
  if (autobotScore > deceptaconScore) {
    return autobots;
  } else if (deceptaconScore > autobotScore) {
    return deceptacons;
  } return false;
}

// Moves the survivor names into a string to be returned part of the final return statement in the battle.

function determineSurvivors(survivors) {
  let survivorsNames = '';
  if (survivors) {
    survivors.forEach((survivor) => {
      survivorsNames += `${survivor.name} `;
    });
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


// MAIN FUNCTION

// Initializes the simulation given an array of Bots

function battle(bots) {
  let autobots = [];
  let deceptacons = [];
  let battleNumber = 0;
  let autobotScore = 0;
  let deceptaconScore = 0;
  const botValidationErrors = checkBotsForErrors(bots);

  // Validate input bots have all data is clean

  if (botValidationErrors) {
    return `One of the bots has an error: ${botValidationErrors}`;
  }

  // Calculate and save the overall rating of each bot

  const botsWithRatings = calculateOverallRating(bots);

  // Sort bots by team, and in order of weakest to strongest.

  autobots = sortTeam(botsWithRatings, 'Autobot');
  deceptacons = sortTeam(botsWithRatings, 'Deceptacon');

  // Check that there are now bots on each team. If not, new inputs are needed an error thrown.

  if (!checkBothTeamsExist(autobots, deceptacons)) {
    return 'There is one team based on the bots provided. Make sure there are two!';
  }

  // Sets the max rounds based on the team sizes. The smallest team dictates maxRounds.

  const maxRounds = Math.min(autobots.length, deceptacons.length);

  // As long as there are still bots on each team and maxRounds isn't met, this simulation will run.

  while (areBothTeamsStillAlive(autobots, deceptacons) && battleNumberLessThanMax(battleNumber, maxRounds)) {
    // Start by increasing the battleNumber

    battleNumber += 1;
    // Take the first bot in line on each team

    const autobotFighter = autobots[0];
    const deceptaconFighter = deceptacons[0];

    // If there is a faceoff between superbots, the scenario ends.

    if (isBotSuperBot(autobotFighter) && isBotSuperBot(deceptaconFighter)) {
      return 'Optimus Prime and Predaking have faced off, meaning everyone has died in an explosion!';
    }

    // Check first to see if any bot runs away and remove from array. Only run the second if the first fails. 
    // Else continue and check to see if there is a loser in a battle

    if (isBotSuperBot(autobotFighter)) {
      autobotScore += 1;
      deceptacons.shift();
    } else if (isBotSuperBot(deceptaconFighter)) {
      deceptaconScore += 1;
      autobots.shift();
    } else if (shouldBotRun(autobotFighter, deceptaconFighter)) {
      autobotScore += 1;
      deceptacons.shift();
    } else if (shouldBotRun(deceptaconFighter, autobotFighter)) {
      deceptaconScore += 1;
      autobots.shift();
    } else if (checkLoser(autobotFighter, deceptaconFighter)) {
      autobotScore += 1;
      deceptacons.shift();
    } else if (checkLoser(deceptaconFighter, autobotFighter)) {
      deceptaconScore += 1;
      autobots.shift();
    } else {
      autobots.shift();
      deceptacons.shift();
    }
  }

  // Generate the output text

  let winningBots;
  let winningTeamName;
  let winningTeamSurvivorNames;
  let losingBots;
  let losingBotsTeamName;
  let losingBotsSurvivors;
  const remainingSurvivors = determineSurvivors(autobots.concat(deceptacons));

  if (autobotScore !== deceptaconScore) {
    winningBots = determineWinners(autobotScore, deceptaconScore, autobots, deceptacons);
    winningTeamName = winningBots[0].team;
    winningTeamSurvivorNames = determineSurvivors(winningBots);
    losingBots = winningBots === autobots ? deceptacons : autobots;
    losingBotsTeamName = winningTeamName === 'Autobot' ? 'Deceptacons' : 'Autobots';
    losingBotsSurvivors = losingBots.length ? `with survivor(s): ${determineSurvivors(losingBots)}` : 'but there are no survivors';
  }

  const battleOutcome = winningBots ? `The winning team are the ${winningTeamName} with survivor(s): ${winningTeamSurvivorNames}` : 'It was a tie!';
  const losingteamOutput = losingBots ? `The losing team are the ${losingBotsTeamName} ${losingBotsSurvivors}` : `Survivors are ${remainingSurvivors}`;

  return `Battles: ${battleNumber}\n${battleOutcome}\n${losingteamOutput}`;
}

// Exports for tests

module.exports = {
  calculateOverallRating,
  sortTeam,
  battle,
  checkBothTeamsExist,
  shouldBotRun,
  checkLoser,
  checkBotsForErrors,
  isBotSuperBot,
};
