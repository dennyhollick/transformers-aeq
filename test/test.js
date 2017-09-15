const assert = require('chai').assert;
const methods = require('../index.js');

const calculateOverallRating = methods.calculateOverallRating;
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
