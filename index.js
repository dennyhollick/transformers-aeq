/*  eslint max-len: 0 */
const testData = require('./botsData.js');
const methods = require('./actions.js');

const calculateOverallRating = methods.calculateOverallRating;
const sortTeam = methods.sortTeam;
const checkBothTeamsExist = methods.checkBothTeamsExist;
const shouldFirstBotRun = methods.shouldFirstBotRun;
const shouldSecondBotRun = methods.shouldSecondBotRun;
const checkLoser = methods.checkLoser;
const checkBotsForErrors = methods.checkBotsForErrors;
const isBotSuperBot = methods.isBotSuperBot;
const generateReportFromBattle = methods.generateReportFromBattle;
const battleNumberLessThanMax = methods.battleNumberLessThanMax;
const areBothTeamsStillAlive = methods.areBothTeamsStillAlive;
const killFirstBot = methods.killFirstBot;

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
      deceptacons = killFirstBot(deceptacons);
    } else if (isBotSuperBot(deceptaconFighter)) {
      deceptaconScore += 1;
      autobots = killFirstBot(autobots);
    } else if (shouldFirstBotRun(autobotFighter, deceptaconFighter)) {
      deceptaconScore += 1;
      autobots = killFirstBot(autobots);
    } else if (shouldSecondBotRun(autobotFighter, deceptaconFighter)) {
      autobotScore += 1;
      deceptacons = killFirstBot(deceptacons);
    } else if (checkLoser(autobotFighter, deceptaconFighter)) {
      autobotScore += 1;
      deceptacons = killFirstBot(deceptacons);
    } else if (checkLoser(deceptaconFighter, autobotFighter)) {
      deceptaconScore += 1;
      autobots = killFirstBot(autobots);
    } else {
      autobots = killFirstBot(autobots);
      deceptacons = killFirstBot(deceptacons);
    }
  }

  // Generate the output text

  return generateReportFromBattle(autobotScore, deceptaconScore, autobots, deceptacons, battleNumber);
}

// console.log(battle(testData));

// Exports for tests

module.exports = {
  calculateOverallRating,
  sortTeam,
  battle,
  checkBothTeamsExist,
  shouldFirstBotRun,
  shouldSecondBotRun,
  checkLoser,
  checkBotsForErrors,
  isBotSuperBot,
  generateReportFromBattle,
};
