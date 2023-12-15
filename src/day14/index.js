import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((l) => l.split(""));

const directions = {
  n: [-1, 0],
  w: [0, -1],
  s: [1, 0],
  e: [0, 1],
};

const tiltBoard = (board, dir) => {
  board.forEach((row, idx) => {
    row.forEach((_rock, jdx) => {
      let i = idx - 1;
      if (_rock === "O") {
        while (board[i]?.[jdx]) {
          const nextRock = board[i][jdx];
          if (nextRock !== ".") {
            break;
          }
          i--;
        }
        board[idx][jdx] = ".";
        board[i + 1][jdx] = "O";
      }
    });
  });
  return board;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const tiltedBoard = tiltBoard([...input]);
  // tiltedBoard.forEach((l) => console.log(l.join("")));

  let score = 0;
  tiltedBoard.forEach((row, idx) => {
    row.forEach((rock) => {
      if (rock === "O") {
        score += tiltedBoard.length - idx;
      }
    });
  });

  return score;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;
run({
  part1: {
    tests: [
      {
        input,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
