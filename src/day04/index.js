import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) =>
    line
      .split(": ")[1]
      .split(" | ")
      .map((str) =>
        str
          .split(/\s+/)
          .filter(Boolean)
          .map(Number)
          .sort((a, b) => a - b),
      ),
  );

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, [winners, mine]) => {
    const intersects = winners.filter((w) => mine.includes(w));

    if (intersects.length > 0) {
      acc += 1 << (intersects.length - 1);
    }
    return acc;
  }, 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const cards = Array(input.length).fill(1);

  input.forEach(([winners, mine], originalCardIndex) => {
    const intersects = winners.filter((w) => mine.includes(w)).length;
    for (
      let i = originalCardIndex + 1;
      i <= originalCardIndex + intersects;
      i++
    ) {
      cards[i] += cards[originalCardIndex];
    }
  });

  return cards.reduce((a, c) => a + c);
};

const test = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

run({
  part1: {
    tests: [
      {
        input: test,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: test,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
