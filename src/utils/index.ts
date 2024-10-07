import { CellType, CoordinateType } from "@/types";

export const COLUMNS = 10;
export const ROWS = 10;

function generateRandomValidPath() {
  const path: Array<CoordinateType> = [];
  let currentX = 0;
  let currentY = 0;

  do {
    const shouldMoveX = Math.random() < 0.5;

    currentX += shouldMoveX && currentX < COLUMNS - 1 ? 1 : 0;
    currentY += !shouldMoveX && currentY < ROWS - 1 ? 1 : 0;

    const step = { y: currentX, x: currentY };
    if (
      path.some((position) => position.x === step.x && position.y === step.y)
    ) {
      continue;
    }
    path.push(step);
  } while (currentX < COLUMNS - 1 || currentY < ROWS - 1);

  return path;
}

function generateMines(path: Array<CoordinateType>) {
  const percentage = 20;
  const totalMines = (COLUMNS * ROWS * percentage) / 100 - 2;
  const mines = [];

  do {
    const positionY = Math.floor(Math.random() * ROWS);
    const positionX = Math.floor(Math.random() * COLUMNS);

    const mine = {
      y: positionY,
      x: positionX,
    };

    if (
      !path.some((position) => position.x === mine.x && position.y === mine.y)
    ) {
      mines.push(mine);
    }
  } while (mines.length !== totalMines);

  return mines;
}

export function initializeGame() {
  const board = Array(ROWS)
    .fill(null)
    .map(() =>
      Array(COLUMNS)
        .fill(null)
        .map(
          () =>
            ({
              type: "cell",
              releaved: false,
            }) as CellType,
        ),
    );

  board[0][0].type = "car";
  board[0][0].releaved = true;

  board[ROWS - 1][COLUMNS - 1].type = "prize";
  board[ROWS - 1][COLUMNS - 1].releaved = true;

  const randomPath = generateRandomValidPath();
  const mines = generateMines(randomPath);

  for (const { y, x } of mines) {
    board[y][x].type = "bomb";
  }

  return board;
}

export function isInsideBoard(position: CoordinateType) {
  return (
    position.y >= 0 &&
    position.y < ROWS &&
    position.x >= 0 &&
    position.x < COLUMNS
  );
}

const POSITIONS_TO_CHECK = [
  { y: -1, x: 0 }, // top
  { y: -1, x: 1 }, // top right
  { y: 0, x: 1 }, // right
  { y: 1, x: 1 }, // bottom right
  { y: 1, x: 0 }, // bottom
  { y: 1, x: -1 }, // bottom left
  { y: 0, x: -1 }, // left
  { y: -1, x: -1 }, // top left
];

export function checkNearMines(board: CellType[][], current: CoordinateType) {
  let mines = 0;
  const { y, x } = current;

  for (const position of POSITIONS_TO_CHECK) {
    const cell = {
      y: y + position.y,
      x: x + position.x,
    };

    if (isInsideBoard(cell) && board[cell.y][cell.x].type === "bomb") {
      mines++;
    }
  }
  return mines;
}
