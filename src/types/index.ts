export type CellType = {
  type: "cell" | "car" | "prize" | "bomb";
  releaved: boolean;
};

export type CoordinateType = {
  y: number;
  x: number;
};
