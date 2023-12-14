import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(""));

const connectors = {
  "|": "ns",
  "-": "ew",
  L: "ne",
  J: "nw",
  7: "sw",
  F: "se",
};

const possibleExits = {
  w: "-LF",
  e: "7J-",
  s: "|LJ",
  n: "|7F",
};

const dirs = {
  w: [-1, 0],
  e: [1, 0],
  n: [0, -1],
  s: [0, 1],
};
const getNeighbors = (grid, pos) => {
  const neighbors = Object.entries(dirs).reduce((acc, [dir, [x, y]]) => {
    return {
      ...acc,
      [dir]: grid[pos?.[1] + y]?.[pos?.[0] + x],
    };
  }, {});
  return neighbors;
};

const getPossibleExits = (neighbors, pos, currPipe) => {
  const exits = [];
  Object.entries(neighbors).forEach(([dir, pipe]) => {
    if (possibleExits[dir].includes(pipe)) {
      if (currPipe === undefined || connectors[currPipe].includes(dir)) {
        exits.push([pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]]);
      }
    }
  });
  return exits;
};

const walkGrid = (grid, start) => {
  let i = 0;
  const visited = [JSON.stringify(start)];
  let next = [...start];
  while (next !== undefined && i < 10000) {
    const currPipe = grid[next[1]][next[0]];
    const ns = getNeighbors(grid, next);
    const ex1 = getPossibleExits(ns, next, currPipe).filter(
      (e) => !visited.includes(JSON.stringify(e)),
    );
    next = ex1[0];

    visited.push(JSON.stringify(next));

    i++;
  }

  return visited;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const start = input.reduce((acc, curr, idx) => {
    if (curr.includes("S")) return [curr.indexOf("S"), idx];
    return acc;
  }, []);

  const neighbors = getNeighbors(input, start);
  const exits = getPossibleExits(neighbors, start);
  const visited1 = walkGrid(input, exits[0]);
  const visited2 = walkGrid(input, exits[1]);

  let score = 0;
  visited1.forEach((v1, idx) => {
    if (v1 === visited2[idx] && score === 0) {
      score = idx + 1;
    }
  });

  return score;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`,
        expected: 4,
      },
      {
        input: `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
        expected: 8,
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
