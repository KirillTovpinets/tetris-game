export type CellConfig = {
  x: number;
  y: number;
  id?: string;
  color?: string;
};

export type Row = {
  cells: CellConfig[];
};

export type CellSize = {
  cellWidth: number;
  cellHeight: number;
};
export type GameConfig = {
  rows: Row[];
  initialX: number;
} & CellSize;

export enum ShapeEnum {
  I,
  O,
  Z,
  N,
  L,
  T,
}

export enum Rotation {
  left,
  right,
}

export type Shape = {
  type: ShapeEnum;
  cells: CellConfig[];
};

export enum KeyboardCodes {
  right = 'ArrowRight',
  left = 'ArrowLeft',
  up = 'ArrowUp',
  down = 'ArrowDown',
}

export type ArrowMeta = {
  middleX?: number;
  middleY?: number;
  nextBottomIndex?: number;
};
