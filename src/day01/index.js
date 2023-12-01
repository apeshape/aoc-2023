import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const wordNums = "one|two|three|four|five|six|seven|eight|nine";
const wordArr = wordNums.split("|");
const getWordNum = (t) => (wordArr.includes(t) ? wordArr.indexOf(t) + 1 : t);
const findDigit = (part1) => (line) => {
  const regex = part1 ? `\\d` : `\\d|${wordNums}`;
  const matches = [...line.matchAll(new RegExp(regex, "ig"))];
  const s = matches.sort((m1, m2) => m1.index - m2.index);
  return Number(`${getWordNum(s[0][0])}${getWordNum(s[s.length - 1][0])}`);
};

const solve = (part1, rawInput) =>
  parseInput(rawInput)
    .map(findDigit(part1))
    .reduce((acc, line) => acc + line, 0);

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
    solution: (rawInput) => solve(true, rawInput),
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
    solution: (rawInput) => solve(false, rawInput),
  },
  trimTestInputs: true,
  onlyTests: false,
});
