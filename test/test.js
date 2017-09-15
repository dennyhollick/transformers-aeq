const assert = require('chai').assert;
const methods = require('../index.js');

const calculateOverallRating = methods.calculateOverallRating;
const sortTeam = methods.sortTeam;
const battle = methods.battle;


/*  eslint prefer-arrow-callback: 0
    func-names: 0
*/

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

  it('Should return an array of decepticon team members', function () {
    const resultAutobot = sortTeam(bots, 'Decepticon');
    console.log('   Decepticons');
    assert.equal(resultAutobot[0].team, 'Decepticon');
    assert.equal(resultAutobot[1].team, 'Decepticon');
    assert.equal(resultAutobot.length, 2);
  });
});
