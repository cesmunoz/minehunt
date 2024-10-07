import { ReactNode } from "react";

type CellType = {
  children: ReactNode;
};

export default function Cell({ children }: CellType) {
  return (
    <div className="rounded-lg bg-slate-400 w-8 h-8 items-center justify-center flex">
      {children}
    </div>
  );
}
