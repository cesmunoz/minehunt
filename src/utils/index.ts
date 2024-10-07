import { CellType, CoordinateType } from "@/types";

export const COLUMNS = 10;
export const ROWS = 10;

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
