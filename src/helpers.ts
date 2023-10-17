import { COLORS, SHAPE_TYPES } from './constants';
import { CellConfig, Shape, ShapeEnum } from './types';

const SHAPE_CELL_COUNT = 4;

export const getCenterCell = (cells: CellConfig[]): CellConfig => {
  const ys = cells.map((i) => i.y);
  const xs = cells.map((i) => i.x);
  let minY = Math.min(...ys);
  let maxY = Math.max(...ys);

  let minX = Math.min(...xs);
  let maxX = Math.max(...xs);
  const middleY = minY + Math.floor((maxY - minY) / 2);
  const middleX = minX + Math.floor((maxX - minX) / 2);

  return {
    x: middleX,
    y: middleY,
  };
};

const getRandomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min) + min);

export const getRandomColor = (): string => {
  const randomNumber = getRandomNumber(0, COLORS.length - 1);
  return COLORS[randomNumber];
};

export const getRandomShape = (): Shape => {
  const randomNumber = getRandomNumber(0, SHAPE_TYPES.length);
  const randomType = SHAPE_TYPES[randomNumber] as ShapeEnum;
  return { type: randomType, cells: SHAPE_CELLS_MAP[randomType] };
};

export const getRandomShapeConfig = (): { shape: Shape; color: string } => {
  return {
    shape: getRandomShape(),
    color: getRandomColor(),
  };
};

const buildIShape = (): CellConfig[] => {
  const cells: CellConfig[] = [];
  for (let i = 0; i < SHAPE_CELL_COUNT; i++) {
    cells.push({ x: i, y: 0 });
  }

  return cells;
};

const buildTShape = (): CellConfig[] => {
  const cells: CellConfig[] = [];
  for (let i = 0; i < SHAPE_CELL_COUNT - 1; i++) {
    cells.push({ x: i, y: 0 });
  }
  const middle = Math.ceil((SHAPE_CELL_COUNT - 1) / 2);
  cells.push({ x: middle, y: 1 });

  return cells;
};

const buildZShape = (): CellConfig[] => {
  const cells: CellConfig[] = [];

  for (let i = 0; i < SHAPE_CELL_COUNT / 2; i++) {
    cells.push({ x: i, y: 0 });
  }

  for (let i = 0; i < SHAPE_CELL_COUNT / 2; i++) {
    cells.push({ x: i + 1, y: 1 });
  }

  return cells;
};

const buildLShape = (): CellConfig[] => {
  const cells: CellConfig[] = [];

  let i;
  for (i = 0; i < SHAPE_CELL_COUNT - 1; i++) {
    cells.push({ x: 0, y: i });
  }

  cells.push({ x: 1, y: i - 1 });
  return cells;
};

const buildOShape = (): CellConfig[] => {
  const cells: CellConfig[] = [];

  for (let i = 0; i < SHAPE_CELL_COUNT / 2; i++) {
    cells.push({ x: i, y: 0 });
  }
  for (let i = 0; i < SHAPE_CELL_COUNT / 2; i++) {
    cells.push({ x: i, y: 1 });
  }

  return cells;
};

export const shapeBuilder = (type: ShapeEnum): CellConfig[] => {
  switch (type) {
    case ShapeEnum.I:
      return buildIShape();
    case ShapeEnum.T:
      return buildTShape();
    case ShapeEnum.L:
      return buildLShape();
    case ShapeEnum.Z:
      return buildZShape();
    case ShapeEnum.O:
      return buildOShape();
    default:
      return [];
  }
};

export const SHAPE_CELLS_MAP: Record<ShapeEnum, CellConfig[]> = (() => {
  return Object.values(ShapeEnum)
    .filter((key) => typeof key !== 'string')
    .reduce((hash, key: string | ShapeEnum) => {
      hash[key as ShapeEnum] = shapeBuilder(key as ShapeEnum);
      return hash;
    }, {} as Record<ShapeEnum, CellConfig[]>) as unknown as Record<
    ShapeEnum,
    CellConfig[]
  >;
})();
