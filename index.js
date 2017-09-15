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
// Winning team (Decepticons): Soundwave
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

// function sortTeam(bots, team) {
//   const currentTeam = [];
//   bots.forEach((bot) => {
//     if (bot.team === team) {
//       currentTeam.push(bot);
//     }
//   });
//   sortTeamByOverallRating(currentTeam);
// }

function battle(bots) {
  // Need to check if there are both teams present
  const botsWithRatings = calculateOverallRating(bots);
  // const autobots = sortTeam(bots, 'Autobot');
  // const decepticons = sortTeam(bots, 'Decepticon');
}


battle(botsData);

module.exports = {
  calculateOverallRating,
  battle,
};
