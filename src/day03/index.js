import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let score = 0;
  input.forEach((line, idx) => {
    const numbersMatch = [...line.matchAll(new RegExp(/\d+/, "g"))];
    const allSymbolsMatch = [input[idx - 1], line, input[idx + 1]]
      .map((l) => {
        return [...(l || "").matchAll(new RegExp(/[^a-zA-Z\d\s\.]/, "g"))];
      })
      .flatMap((m) => m);
    numbersMatch.forEach((m) => {
      allSymbolsMatch.forEach((sm) => {
        if (sm.index >= m.index - 1 && sm.index <= m.index + m[0].length) {
          score += Number(m[0]);
        }
      });
    });
  });

  return score;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let score = 0;
  input.forEach((line, idx) => {
    const gearMatch = [...line.matchAll(new RegExp(/\*/, "g"))];
    const allNumbersMatch = [input[idx - 1], line, input[idx + 1]]
      .map((l) => {
        return [...(l || "").matchAll(new RegExp(/\d+/, "g"))];
      })
      .flatMap((m) => m);

    gearMatch.forEach((gear) => {
      const nums = [];
      allNumbersMatch.forEach((num) => {
        if (
          gear.index >= num.index - 1 &&
          gear.index <= num.index + num[0].length
        ) {
          nums.push(Number(num[0]));
        }
      });
      if (nums.length === 2) {
        score += nums[0] * nums[1];
      }
    });
  });

  return score;
};

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
