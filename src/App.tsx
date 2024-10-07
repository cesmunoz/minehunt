import { Button } from "@/components/ui/button";
import Cell from "@/components/cell";
import { useState } from "react";
import { CellType } from "./types";
import { Bomb } from "lucide-react";

const COLUMNS = 10;
const ROWS = 10;

function initializeGame() {
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

function App() {
  const [board, setBoard] = useState(initializeGame());
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-900 to-purple-200 p-2">
      <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-4">
        <h1 className="text-secondary text-5xl text-center font-bold">
          Mine Hunter
        </h1>
        <div className="flex flex-col gap-1 bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between px-2">
            <div className="text-secondary pb-2 font-semibold">Near 0 mine</div>
            <div className="text-secondary pb-2 font-semibold">Score: 0</div>
          </div>
          {board.map((row, rowIndex) => {
            return (
              <div className="flex gap-1" key={`row-${rowIndex}`}>
                {row.map((cell, columnIndex) => (
                  <Cell key={`cell-${rowIndex}-${columnIndex}`} item={cell} />
                ))}
              </div>
            );
          })}
        </div>
        <section className="text-secondary flex flex-col items-center text-center gap-4">
          {win && (
            <div className="text-green-400 font-bold text-xl">You won! 🏆</div>
          )}
          {gameOver && (
            <div className="text-red-500 font-bold text-xl">Game Over 💥</div>
          )}
          <Button className="w-28 h-10 rounded-lg">New Game</Button>
          <span className="text-base font-bold flex justify-center items-center">
            Help the car navigate thourgh the minified to reach the prize!
          </span>
          <div className="text-sm font-medium flex flex-col">
            <span>Use the arrow keys or W A S D keys to move the car</span>
            <span className="flex items-center justify-center gap-2">
              Avoid the mines
              <Bomb className="w-4 h-4" />
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
