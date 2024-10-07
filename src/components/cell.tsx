import { cn } from "@/lib/utils";
import { CellType } from "@/types";
import { Car, Trophy } from "lucide-react";

type CellProps = {
  item: CellType;
};

export default function Cell({ item }: CellProps) {
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
      {item.type === "prize" && <Trophy />}
    </div>
  );
}
