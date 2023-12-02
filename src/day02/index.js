import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((l) => l.split(": ")[1].split("; "));

const test = {
  red: 12,
  green: 13,
  blue: 14,
};

const part1 = (rawInput) => {
  const games = parseInput(rawInput);
  let score = 0;

  const canPlay = (b) => {
    return b.green <= test.green && b.blue <= test.blue && b.red <= test.red;
  };
  games.forEach((game, idx) => {
    const gameId = idx + 1;
    const bag = {};
    game.forEach((set) => {
      const d = set.split(", ").map((dice) => dice.split(" "));
      d.forEach(([count, color]) => {
        const c = Number(count);
        if (!bag[color]) bag[color] = c;
        if (c > bag[color]) bag[color] = c;
      });
    });
    if (canPlay(bag)) score += gameId;
  });

  return score;
};

const part2 = (rawInput) => {
  const games = parseInput(rawInput);
  let score = 0;

  games.forEach((game, idx) => {
    const bag = {};
    // console.log("GAME", idx + 1);
    game.forEach((set) => {
      const d = set.split(", ").map((dice) => dice.split(" "));
      d.forEach(([count, color]) => {
        const c = Number(count);
        if (!bag[color]) bag[color] = c;
        if (c > bag[color]) bag[color] = c;
      });
    });
    const s = Object.values(bag).reduce((a, c) => a * c);
    // console.log(bag, s, Object.values(bag));
    score += s;
  });

  return score;
};

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
