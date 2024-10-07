import { Button } from "@/components/ui/button";
import Cell from "@/components/cell";
import { useCallback, useEffect, useState } from "react";
import { Bomb } from "lucide-react";
import { CellType, CoordinateType } from "./types";
import { initializeGame, isInsideBoard } from "./utils";

function App() {
  const [board, setBoard] = useState(initializeGame());
  const [car, setCar] = useState<CoordinateType>({ y: 0, x: 0 });
  const [score, setScore] = useState(0);
  const [nearBombs, setNearBombs] = useState(0);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      const newCarPosition = { ...car };

      switch (key) {
        case "arrowup":
        case "w":
          newCarPosition.y--;
          break;
        case "arrowdown":
        case "s":
          newCarPosition.y++;
          break;
        case "arrowleft":
        case "l":
          newCarPosition.x--;
          break;
        case "arrowright":
        case "r":
          newCarPosition.x++;
          break;
      }

      if (isInsideBoard(newCarPosition)) {
        setCar(newCarPosition);

        const newBoard = [...board];
        const { y: newRow, x: newColumn } = newCarPosition;
        const { y: oldRow, x: oldColumn } = car;

        newBoard[oldRow][oldColumn].type = "cell";

        newBoard[newRow][newColumn].type = "car";
        newBoard[newRow][newColumn].releaved = true;

        setBoard(newBoard);
      }
    },
    [car, board],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-900 to-purple-200 p-2">
      <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-4">
        <h1 className="text-secondary text-5xl text-center font-bold">
          Mine Hunter
        </h1>
        <div className="flex flex-col gap-1 bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between px-2">
            <div className="text-secondary pb-2 font-semibold">
              Near {nearBombs} mine
            </div>
            <div className="text-secondary pb-2 font-semibold">
              Score: {score}
            </div>
          </div>
          {board.map((row: Array<CellType>, rowIndex: number) => {
            return (
              <div className="flex gap-1" key={`row-${rowIndex}`}>
                {row.map((cell: CellType, columnIndex: number) => (
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
