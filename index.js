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


const bots = [
  {
    name: 'Optimus Prime',
    team: 'Autobot',
    skills: {
      strength: 10,
      intellegence: 10,
      speed: 8,
      endurance: 10,
      rank: 10,
      courage: 10,
      firepower: 8,
      skill: 10,
    },
  },
  {
    name: 'Red Alert',
    team: 'Autobot',
    skills: {
      strength: 5,
      intellegence: 7,
      speed: 3,
      endurance: 5,
      rank: 7,
      courage: 7,
      firepower: 7,
      skill: 8,
    },
  },
  {
    name: 'Bumblebee',
    team: 'Autobot',
    skills: {
      strength: 2,
      intellegence: 8,
      speed: 4,
      endurance: 7,
      rank: 7,
      courage: 10,
      firepower: 1,
      skill: 7,
    },
  },
  {
    name: 'Afterburner',
    team: 'Autobot',
    skills: {
      strength: 7,
      intellegence: 6,
      speed: 6,
      endurance: 6,
      rank: 5,
      courage: 8,
      firepower: 7,
      skill: 7,
    },
  },
  {
    name: 'Fireflight',
    team: 'Autobot',
    skills: {
      strength: 7,
      intellegence: 5,
      speed: 8,
      endurance: 8,
      rank: 6,
      courage: 9,
      firepower: 7,
      skill: 3,
    },
  },
  {
    name: 'Predaking',
    team: 'Decepticon',
    skills: {
      strength: 10,
      intellegence: 5,
      speed: 8,
      endurance: 8,
      rank: 7,
      courage: 9,
      firepower: 9,
      skill: 8,
    },
  },
  {
    name: 'Megatron',
    team: 'Decepticon',
    skills: {
      strength: 10,
      intellegence: 10,
      speed: 4,
      endurance: 8,
      rank: 10,
      courage: 9,
      firepower: 10,
      skill: 9,
    },
  },
  {
    name: 'BuzzSaw',
    team: 'Decepticon',
    skills: {
      strength: 5,
      intellegence: 8,
      speed: 8,
      endurance: 4,
      rank: 6,
      courage: 7,
      firepower: 4,
      skill: 9,
    },
  },
  {
    name: 'Ravage',
    team: 'Decepticon',
    skills: {
      strength: 5,
      intellegence: 8,
      speed: 5,
      endurance: 6,
      rank: 7,
      courage: 4,
      firepower: 7,
      skill: 10,
    },
  },
  {
    name: 'Venom',
    team: 'Decepticon',
    skills: {
      strength: 3,
      intellegence: 9,
      speed: 3,
      endurance: 6,
      rank: 8,
      courage: 9,
      firepower: 8,
      skill: 8,
    },
  },
];
