## Assumptions

1. The inputs of bots should be and array objects in the following format:

`
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
`

2. The weakest transformers will face the weakest on the other team first.
3. If the teams are not balanced (eg. 2 vs 4), there will only be as many rounds as the smallest team.
4. Transformers should have complete and correct data. If not, an error will be returned as a string.
5. If Optimus Prime or Predaking face eachother, there is no winner and everyone blows up.
6. The team that eliminates the most of the other team without dying themselves wins.
7. In the event of a tie, the function returns a tie message.
8. Everything returned comes back as a string.