# The Transformers Simulator

This is a simulator that takes in transformers (autobots and deceptacons) and puts them head to head in battle. 

## Initialization

You'll need NodeJS to run this program

1. Download or clone the repo
2. Run `npm install`
3. Run `npm test` to see the test coverage

To run the program with your own data, use the 'battle' function in index.js See below on how to structure inputs. You can also uncomment the function that runs test data at the bottom of the code

Uncomment this line 104: --> `// console.log(battle(testData));`

Then run `node index.js`

## Assumptions

1. The inputs of bots should be and array objects in the following format:

``
[
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
]
``
2. The weakest transformers will face the weakest on the other team first.
3. If the teams are not balanced (eg. 2 vs 4), there will only be as many rounds as the smallest team.
4. Transformers should have complete and correct data. If not, an error will be returned as a string.
5. If Optimus Prime or Predaking face eachother, there is no winner and everyone blows up.
6. The team that eliminates the most of the other team without dying themselves wins.
7. In the event of a tie, the function returns a tie message.
8. Everything returned comes back as a string.

## Future Improvements

1. Throw exceptions instead of return for errors
2. Create some classes rather than using functions
3. Refactor the battle and pull out the if logic
4. Improve some of the test coverage.
5. Build a UI.

## Screenshots

![Test Coverage]()
![Output From Battle]()