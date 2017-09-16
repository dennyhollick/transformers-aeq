// ESLint config

/*  eslint prefer-arrow-callback: 0,
    func-names: 0,
    no-undef: 0,
    max-len: 0,
    no-console: 0, */

// Method & data imports

const assert = require('chai').assert;
const methods = require('../index.js');
const botsData = require('../botsData.js');

const calculateOverallRating = methods.calculateOverallRating;
const sortTeam = methods.sortTeam;
const battle = methods.battle;
const checkBothTeamsExist = methods.checkBothTeamsExist;
const shouldBotRun = methods.shouldBotRun;
const checkLoser = methods.checkLoser;
const checkBotsForErrors = methods.checkBotsForErrors;
const isBotSuperBot = methods.isBotSuperBot;

// VALIDATIONS

describe('Teams Validation', () => {
  const bots = [
    {
      name: 'Optimus Prime',
      team: 'Autobot',
      skills: {
        strength: 10,
        intelligence: 10,
        speed: 8,
        endurance: 10,
        rank: 10,
        courage: 10,
        firepower: 8,
        skill: 10,
      },
    },
    {
      name: 'Ravage',
      team: 'Deceptacon',
      overallRating: 31,
      skills: {
        strength: 5,
        intelligence: 8,
        speed: 5,
        endurance: 6,
        rank: 7,
        courage: 4,
        firepower: 7,
        skill: 10,
      },
    },
  ];
  it('checkBothTeamsExist method return false if there is only 1 team', function () {
    const result = checkBothTeamsExist([bots[0]]);
    assert.equal(result, false);
  });
  it('checkBothTeamsExist method return true if there are 2 teams', function () {
    const result = checkBothTeamsExist([bots[0]], [bots[1]]);
    assert.equal(result, true);
  });
});

describe('Bot Validation', () => {
  it('Should return false if everything is good', function () {
    const bots = [
      {
        name: 'Red Alert',
        team: 'Autobot',
        skills: {
          strength: 5,
          intelligence: 7,
          speed: 3,
          endurance: 5,
          rank: 7,
          courage: 7,
          firepower: 7,
          skill: 8,
        },
      },
      {
        name: 'Ravage',
        team: 'Deceptacon',
        skills: {
          strength: 5,
          intelligence: 8,
          speed: 5,
          endurance: 6,
          rank: 7,
          courage: 4,
          firepower: 7,
          skill: 10,
        },
      },
    ];
    const result = checkBotsForErrors(bots);
    assert.equal(result, false);
  });
  it('Should return an error if a name is missing', function () {
    const bot = [
      {
        name: '',
        team: 'Autobot',
        skills: {
          intelligence: 10,
          speed: 8,
          endurance: 10,
          rank: 10,
          courage: 10,
          firepower: 8,
          skill: 10,
        },
      },
    ];
    const result = checkBotsForErrors(bot);
    assert.equal(result, 'a bot has no name');
  });
  it('Should return an error if a team name is incorrect', function () {
    const bot = [
      {
        name: 'Optimus Prime',
        team: 'Autobit',
        skills: {
          strength: 10,
          intelligence: 10,
          speed: 8,
          endurance: 10,
          rank: 10,
          courage: 10,
          firepower: 8,
          skill: 10,
        },
      },
    ];
    const result = checkBotsForErrors(bot);
    assert.equal(result, 'bot Optimus Prime has incorrect team.');
  });
  it('Should return an error if a team name is missing', function () {
    const bot = [
      {
        name: 'Optimus Prime',
        skills: {
          strength: 10,
          intelligence: 10,
          speed: 8,
          endurance: 10,
          rank: 10,
          courage: 10,
          firepower: 8,
          skill: 10,
        },
      },
    ];
    const result = checkBotsForErrors(bot);
    assert.equal(result, 'bot Optimus Prime has incorrect team.');
  });
  it('Should return an error if a skill is missing', function () {
    const bot = [
      {
        name: 'Optimus Prime',
        team: 'Autobot',
        skills: {
          intelligence: 10,
          speed: 8,
          endurance: 10,
          rank: 10,
          courage: 10,
          firepower: 8,
          skill: 10,
        },
      },
    ];
    const result = checkBotsForErrors(bot);
    assert.equal(result, 'bot Optimus Prime is missing a skill.');
  });
  it('Should return an error if all skills are missing', function () {
    const bot = [
      {
        name: 'Optimus Prime',
        team: 'Autobot',
      },
    ];
    const result = checkBotsForErrors(bot);
    assert.equal(result, 'bot Optimus Prime has no skills.');
  });
});

// SCORE 

describe('Overall Score', () => {
  it('Should return an array with bots that have an overall score attached to them.', function () {
    const bot = [
      {
        name: 'Optimus Prime',
        team: 'Autobot',
        skills: {
          strength: 10,
          intelligence: 10,
          speed: 8,
          endurance: 10,
          rank: 10,
          courage: 10,
          firepower: 8,
          skill: 10,
        },
      },
    ];
    const result = calculateOverallRating(bot);
    const skills = bot[0].skills;
    const overallRating = skills.strength + skills.intelligence + skills.speed + skills.endurance + skills.firepower;
    assert.equal(result[0].overallRating, overallRating);
  });
});

// SORTING

describe('Team Sorting', () => {
  const bots = [
    {
      name: 'Optimus Prime',
      team: 'Autobot',
      overallRating: 46,
      skills: {
        strength: 10,
        intelligence: 10,
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
      overallRating: 27,
      skills: {
        strength: 5,
        intelligence: 7,
        speed: 3,
        endurance: 5,
        rank: 7,
        courage: 7,
        firepower: 7,
        skill: 8,
      },
    },
    {
      name: 'Ravage',
      team: 'Deceptacon',
      overallRating: 31,
      skills: {
        strength: 5,
        intelligence: 8,
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
      team: 'Deceptacon',
      overallRating: 29,
      skills: {
        strength: 3,
        intelligence: 9,
        speed: 3,
        endurance: 6,
        rank: 8,
        courage: 9,
        firepower: 8,
        skill: 8,
      },
    },
  ];

  it('Should return an array of only autobot team members', function () {
    const resultAutobot = sortTeam(bots, 'Autobot');
    console.log('   Autobots');
    assert.equal(resultAutobot[0].team, 'Autobot');
    assert.equal(resultAutobot[1].team, 'Autobot');
    assert.equal(resultAutobot.length, 2);
  });

  it('Should be sorted lowest overallRating to highest', function () {
    const resultAutobot = sortTeam(bots, 'Autobot');
    assert.isTrue(resultAutobot[0].overallRating < resultAutobot[1].overallRating);
    console.log(`   Rating: ${resultAutobot[0].overallRating} < ${resultAutobot[1].overallRating}`);
  });

  it('Should return an array of deceptacon team members', function () {
    const resultDeceptacon = sortTeam(bots, 'Deceptacon');
    console.log('   Deceptacons');
    assert.equal(resultDeceptacon[0].team, 'Deceptacon');
    assert.equal(resultDeceptacon[1].team, 'Deceptacon');
    assert.equal(resultDeceptacon.length, 2);
  });

  it('Should be sorted lowest overallRating to highest', function () {
    const resultDeceptacon = sortTeam(bots, 'Deceptacon');
    assert.isTrue(resultDeceptacon[0].overallRating < resultDeceptacon[1].overallRating);
    console.log(`   Rating: ${resultDeceptacon[0].overallRating} < ${resultDeceptacon[1].overallRating}`);
  });
});

// SUPERBOT POWERS

describe('SuperBot Powers', () => {
  const bots = [
    {
      name: 'Optimus Prime',
      team: 'Autobot',
      skills: {
        strength: 10,
        intelligence: 10,
        speed: 8,
        endurance: 10,
        rank: 10,
        courage: 10,
        firepower: 8,
        skill: 10,
      },
    },
    {
      name: 'Predaking',
      team: 'Deceptacon',
      skills: {
        strength: 10,
        intelligence: 5,
        speed: 8,
        endurance: 8,
        rank: 7,
        courage: 9,
        firepower: 9,
        skill: 8,
      },
    },
    {
      name: 'Ravage',
      team: 'Deceptacon',
      overallRating: 31,
      skills: {
        strength: 5,
        intelligence: 8,
        speed: 5,
        endurance: 6,
        rank: 7,
        courage: 4,
        firepower: 7,
        skill: 10,
      },
    },
  ];
  it('Bot should be identified as superbot if Optimus Prime', function () {
    const result = isBotSuperBot(bots[0]);
    assert.equal(result, true);
  });
  it('Bot should be identified as superbot if Predaking', function () {
    const result = isBotSuperBot(bots[1]);
    assert.equal(result, true);
  });
  it('Bot should NOT be identified as superbot if NOT Optimus Prime or Predaking', function () {
    const result = isBotSuperBot(bots[2]);
    assert.equal(result, false);
  });
});

// RUNNING AWAY

describe('Running Away', () => {
  const bots = [
    {
      name: 'Optimus Prime',
      team: 'Autobot',
      skills: {
        strength: 10,
        intelligence: 10,
        speed: 8,
        endurance: 10,
        rank: 10,
        courage: 10,
        firepower: 8,
        skill: 10,
      },
    },
    {
      name: 'Megatron',
      team: 'Deceptacon',
      skills: {
        strength: 10,
        intelligence: 10,
        speed: 4,
        endurance: 8,
        rank: 10,
        courage: 9,
        firepower: 10,
        skill: 9,
      },
    },
    {
      name: 'Ravage',
      team: 'Deceptacon',
      overallRating: 31,
      skills: {
        strength: 5,
        intelligence: 8,
        speed: 5,
        endurance: 6,
        rank: 7,
        courage: 4,
        firepower: 7,
        skill: 10,
      },
    },
  ];
  it('Bot should run away if opponent is 4 or more points of courage and 3 or more points of strength', function () {
    const result = shouldBotRun(bots[0], bots[2]);
    assert.equal(result, true);
  });
  it('Bot should NOT run away if opponent is 4 or more points of courage and 3 or more points of strength', function () {
    const result = shouldBotRun(bots[0], bots[1]);
    assert.equal(result, false);
  });
});

// FIGHTING

describe('Fighting', () => {
  const bots = [
    {
      name: 'Optimus Prime',
      team: 'Autobot',
      skills: {
        strength: 10,
        intelligence: 10,
        speed: 8,
        endurance: 10,
        rank: 10,
        courage: 10,
        firepower: 8,
        skill: 10,
      },
    },
    {
      name: 'Megatron',
      team: 'Deceptacon',
      skills: {
        strength: 10,
        intelligence: 10,
        speed: 4,
        endurance: 8,
        rank: 10,
        courage: 9,
        firepower: 10,
        skill: 9,
      },
    },
    {
      name: 'Ravage',
      team: 'Deceptacon',
      overallRating: 31,
      skills: {
        strength: 5,
        intelligence: 8,
        speed: 5,
        endurance: 6,
        rank: 7,
        courage: 4,
        firepower: 7,
        skill: 10,
      },
    },
  ];
  it('Bot should die opponent is 3 or more points of strength', function () {
    const result = checkLoser(bots[0], bots[2]);
    assert.equal(result, true);
  });
  it('Both should lose the fight and no loser declared if either is within 3 points of strength', function () {
    const result = checkLoser(bots[0], bots[1]);
    assert.equal(result, false);
  });
});

// BATTLE TESTS

describe('Battle Scenarios', () => {
  it('Should return a winner and survivors given the right data', function () {
    const bots = botsData;
    const result = battle(bots);
    assert.equal(result, 'Battles: 5\nThe winning team are the Deceptacon with survivor(s): Predaking Megatron \nThe losing team are the Autobots with survivor(s): Optimus Prime ');
  });
  it('Should return an error if there is only one team', function () {
    const bots = [
      {
        name: 'Megatron',
        team: 'Deceptacon',
        skills: {
          strength: 10,
          intelligence: 10,
          speed: 4,
          endurance: 8,
          rank: 10,
          courage: 9,
          firepower: 10,
          skill: 9,
        },
      },
      {
        name: 'Ravage',
        team: 'Deceptacon',
        overallRating: 31,
        skills: {
          strength: 5,
          intelligence: 8,
          speed: 5,
          endurance: 6,
          rank: 7,
          courage: 4,
          firepower: 7,
          skill: 10,
        },
      },
    ];
    const result = battle(bots);
    assert.equal(result, 'There is one team based on the bots provided. Make sure there are two!');
  });
  it('Everyone should blow up if Optimus Prime and Predaking face off', function () {
    const bots = [
      {
        name: 'Optimus Prime',
        team: 'Autobot',
        skills: {
          strength: 10,
          intelligence: 10,
          speed: 8,
          endurance: 10,
          rank: 10,
          courage: 10,
          firepower: 8,
          skill: 10,
        },
      },
      {
        name: 'Predaking',
        team: 'Deceptacon',
        skills: {
          strength: 10,
          intelligence: 5,
          speed: 8,
          endurance: 8,
          rank: 7,
          courage: 9,
          firepower: 9,
          skill: 8,
        },
      },
    ];
    const result = battle(bots);
    assert.equal(result, 'Optimus Prime and Predaking have faced off, meaning everyone has died in an explosion!');
  });
  it('A superbot will win against everyone', function () {
    const bots = [
      {
        name: 'Optimus Prime',
        team: 'Autobot',
        skills: {
          strength: 10,
          intelligence: 10,
          speed: 8,
          endurance: 10,
          rank: 10,
          courage: 10,
          firepower: 8,
          skill: 10,
        },
      },
      {
        name: 'Megatron',
        team: 'Deceptacon',
        skills: {
          strength: 10,
          intelligence: 10,
          speed: 10,
          endurance: 10,
          rank: 10,
          courage: 10,
          firepower: 10,
          skill: 10,
        },
      },
    ];
    const result = battle(bots);
    assert.equal(result, 'Battles: 1\nThe winning team are the Autobot with survivor(s): Optimus Prime \nThe losing team are the Deceptacons but there are no survivors');
  });
  it('It should say there are no survivors on the other team if everyone is dead', function () {
    const bots = [
      {
        name: 'Red Alert',
        team: 'Autobot',
        skills: {
          strength: 5,
          intelligence: 7,
          speed: 3,
          endurance: 5,
          rank: 7,
          courage: 7,
          firepower: 7,
          skill: 8,
        },
      },
      {
        name: 'Megatron',
        team: 'Deceptacon',
        skills: {
          strength: 10,
          intelligence: 10,
          speed: 10,
          endurance: 10,
          rank: 10,
          courage: 10,
          firepower: 10,
          skill: 10,
        },
      },
    ];
    const result = battle(bots);
    assert.equal(result, 'Battles: 1\nThe winning team are the Deceptacon with survivor(s): Megatron \nThe losing team are the Autobots but there are no survivors');
  });
  it('It should say there are survivors on the losing team if any exist', function () {
    const bots = [
      {
        name: 'Red Alert',
        team: 'Autobot',
        skills: {
          strength: 5,
          intelligence: 7,
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
          strength: 7,
          intelligence: 8,
          speed: 4,
          endurance: 7,
          rank: 7,
          courage: 10,
          firepower: 1,
          skill: 7,
        },
      },
      {
        name: 'Megatron',
        team: 'Deceptacon',
        skills: {
          strength: 10,
          intelligence: 10,
          speed: 10,
          endurance: 10,
          rank: 10,
          courage: 10,
          firepower: 10,
          skill: 10,
        },
      },
    ];
    const result = battle(bots);
    assert.equal(result, 'Battles: 1\nThe winning team are the Deceptacon with survivor(s): Megatron \nThe losing team are the Autobots with survivor(s): Bumblebee ');
  });
  it('It should say there are survivors on the winning team if any exist', function () {
    const bots = [
      {
        name: 'Red Alert',
        team: 'Autobot',
        skills: {
          strength: 5,
          intelligence: 7,
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
          strength: 7,
          intelligence: 8,
          speed: 4,
          endurance: 7,
          rank: 7,
          courage: 10,
          firepower: 1,
          skill: 7,
        },
      },
      {
        name: 'Megatron',
        team: 'Deceptacon',
        skills: {
          strength: 1,
          intelligence: 1,
          speed: 1,
          endurance: 1,
          rank: 1,
          courage: 1,
          firepower: 1,
          skill: 1,
        },
      },
    ];
    const result = battle(bots);
    assert.equal(result, 'Battles: 1\nThe winning team are the Autobot with survivor(s): Red Alert Bumblebee \nThe losing team are the Deceptacons but there are no survivors');
  });
});
