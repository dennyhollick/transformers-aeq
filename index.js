// ● Strength
// ● Intelligence
// ● Speed
// ● Endurance
// ● Rank
// ● Courage
// ● Firepower
// ● Skill

// All of these criteria are ranked from 1 to 10.

// The “overall rating” of a Transformer is the following formula:
// (Strength + Intelligence + Speed + Endurance + Firepower)

// Each Transformer must either be an Autobot or a Deception.

// Your program should take input that describes a group of Transformers and based on that group
// displays:
// a. The number of battles
// b. The winning team
// c. The surviving members of the losing team

// The basic rules of the battle are:

// ● The teams should be sorted by rank and faced off one on one against each other in order to
// determine a victor, the loser is eliminated
// ● A battle between opponents uses the following rules:
// ○ If any fighter is down 4 or more points of courage and 3 or more points of strength
// compared to their opponent, the opponent automatically wins the face-off regardless of
// overall rating (opponent has ran away)
// ○ Otherwise, if one of the fighters is 3 or more points of skill above their opponent, they win
// the fight regardless of overall rating
// ○ The winner is the Transformer with the highest overall rating
// ● In the event of a tie, both Transformers are considered destroyed
// ● Any Transformers who don’t have a fight are skipped (i.e. if it’s a team of 2 vs. a team of 1, there’s
// only going to be one battle)
// ● The team who eliminated the largest number of the opposing team is the winner
// Special rules:
// ● Any Transformer named Optimus Prime or Predaking wins his fight automatically regardless of
// any other criteria
// ● In the event either of the above face each other (or a duplicate of each other), the game
// immediately ends with all competitors destroyed
// For example, given the following input:
// Soundwave, D, 8,9,2,6,7,5,6,10
// Bluestreak, A, 6,6,7,9,5,2,9,7

// Hubcap: A, 4,4,4,4,4,4,4,4
// The output should be:
// 1 battle
// Winning team (Deceptacons): Soundwave
// Survivors from the losing team (Autobots): Hubcap

const botsData = require('./botsData');

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

function sortTeamByOverallRating(team) {
  team.sort((a, b) => parseFloat(a.overallRating) - parseFloat(b.overallRating));
  return team;
}

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

function checkBothTeamsExist(team1, team2) {
  if (team1 && team2 && team1.length && team2.length) {
    return true;
  }
  return false;
}

function shouldBotRun(bot1, bot2) {
  if (((bot1.skills.courage - bot2.skills.courage) >= 4) && (bot1.skills.strength - bot2.skills.strength) >= 3) {
    return true;
  }
  return false;
}

function checkLoser(bot1, bot2) {
  if (bot1.skills.strength - bot2.skills.strength >= 3) {
    return true;
  }
  return false;
}

function determineWinners(autobotScore, deceptaconScore, autobots, deceptacons) {
  if (autobotScore > deceptaconScore) {
    return autobots;
  } else if (deceptaconScore > autobotScore) {
    return deceptacons;
  } return false;
}

function determineSurvivors(survivors) {
  let survivorsNames = '';
  if (survivors) {
    survivors.forEach((survivor) => {
      survivorsNames += `${survivor.name} `;
    });
  }
  return survivorsNames;
}

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

function isBotSuperBot(bot) {
  if (bot.name === 'Optimus Prime' || bot.name === 'Predaking') {
    return true;
  } return false;
}

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

  const maxRounds = autobots.length <= deceptacons.length ? autobots.length : deceptacons.length;

  // As long as there are still bots on each team and maxRounds isn't met, this simulation will run.

  while ((autobots.length > 0 && deceptacons.length > 0) && maxRounds > battleNumber) {
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
