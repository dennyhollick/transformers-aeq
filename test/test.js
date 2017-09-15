const assert = require('chai').assert;
const methods = require('../index.js');

const calculateOverallRating = methods.calculateOverallRating;
const sortTeam = methods.sortTeam;
const battle = methods.battle;
const checkBothTeamsExist = methods.checkBothTeamsExist;


/*  eslint prefer-arrow-callback: 0
    func-names: 0
*/

describe('Data Validation', function () {
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
      team: 'Decepticon',
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
  it('Battle method return an error if there is only 1 team', function () {
    const result = battle([bots[0]]);
    assert.equal(result, 'There is one one team based on the bots provided. Make sure there are two!');
  });
  it('checkBothTeamsExist method return false if there is only 1 team', function () {
    const result = checkBothTeamsExist([bots[0]]);
    assert.equal(result, false);
  });
  it('checkBothTeamsExist method return true if there are 2 teams', function () {
    const result = checkBothTeamsExist([bots[0]], [bots[1]]);
    assert.equal(result, true);
  });
});

describe('Overall Score', function () {
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

describe('Team Sorting', function () {
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
      team: 'Decepticon',
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
      team: 'Decepticon',
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

  it('Should return an array of decepticon team members', function () {
    const resultDecepticon = sortTeam(bots, 'Decepticon');
    console.log('   Decepticons');
    assert.equal(resultDecepticon[0].team, 'Decepticon');
    assert.equal(resultDecepticon[1].team, 'Decepticon');
    assert.equal(resultDecepticon.length, 2);
  });

  it('Should be sorted lowest overallRating to highest', function () {
    const resultDecepticon = sortTeam(bots, 'Decepticon');
    assert.isTrue(resultDecepticon[0].overallRating < resultDecepticon[1].overallRating);
    console.log(`   Rating: ${resultDecepticon[0].overallRating} < ${resultDecepticon[1].overallRating}`);
  });
});
