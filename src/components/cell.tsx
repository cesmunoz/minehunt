import { cn } from "@/lib/utils";
import { CellType } from "@/types";
import { Bomb, Car, Trophy } from "lucide-react";

type CellProps = {
  item: CellType;
  gameOver: boolean;
  win: boolean;
};

export default function Cell({ item, gameOver, win }: CellProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-slate-400 w-8 h-8 items-center justify-center flex",
        {
          "bg-sky-400": item.releaved,
        },
      )}
    >
      {item.type === "car" && <Car />}
      {item.type === "prize" && (
        <Trophy className={cn({ "text-green-700": win })} />
      )}
      {(gameOver || win) && item.type === "bomb" && (
        <Bomb className="text-red-700" />
      )}
    </div>
  );
}
