import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const wordNums = "one|two|three|four|five|six|seven|eight|nine";
const wordArr = wordNums.split("|");
const getWordNum = (t) => (wordArr.includes(t) ? wordArr.indexOf(t) + 1 : t);
const findDigit = (part1) => (line) => {
  const regex = part1 ? `\\d` : `\\d|${wordNums}`;
  const matches = [...line.matchAll(new RegExp(regex, "ig"))];

  const first = matches.sort((m1, m2) => m1.index - m2.index)[0][0];
  const last = matches.sort((m1, m2) => m2.index - m1.index)[0][0];
  return Number(`${getWordNum(first)}${getWordNum(last)}`);
};

const solve = (part1, rawInput) =>
  parseInput(rawInput)
    .split("\n")
    .map(findDigit(part1))
    .reduce((acc, line) => acc + line, 0);

const part1 = (rawInput) => solve(true, rawInput);
const part2 = (rawInput) => solve(false, rawInput);

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
