import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const digitsDict = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const findDigit = (part1) => (line) => {
  const wordNums = "one|two|three|four|five|six|seven|eight|nine";
  const regex = part1 ? `\\d` : `\\d|${wordNums}`;
  const matches = [...line.matchAll(new RegExp(regex, "ig"))];

  const first = matches.sort((m1, m2) => m1.index - m2.index)[0][0];
  const last = matches.sort((m1, m2) => m2.index - m1.index)[0][0];
  const f = digitsDict[first] ?? first;
  const l = digitsDict[last] ?? last;
  return Number(`${f}${l}`);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split("\n");
  return input.map(findDigit(true)).reduce((a, c) => a + c, 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split("\n");
  const res = input.map(findDigit(false)).reduce((acc, line) => acc + line, 0);
  return res;
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
