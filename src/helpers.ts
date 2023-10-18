import { COLORS, SHAPE_TYPES } from './constants';
import shapeFactories from './shape-factories';
import { CellConfig, Shape, ShapeEnum } from './types';

const SHAPE_BUILDERS_MAP = {
  [ShapeEnum.I]: shapeFactories.buildIShape,
  [ShapeEnum.L]: shapeFactories.buildLShape,
  [ShapeEnum.N]: shapeFactories.buildNShape,
  [ShapeEnum.O]: shapeFactories.buildOShape,
  [ShapeEnum.T]: shapeFactories.buildTShape,
  [ShapeEnum.Z]: shapeFactories.buildZShape,
};

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

export const getRandomShape = (initialX: number): Shape => {
  const randomNumber = getRandomNumber(0, SHAPE_TYPES.length);
  const randomType = SHAPE_TYPES[randomNumber] as ShapeEnum;
  return { type: randomType, cells: SHAPE_CELLS_MAP(initialX)[randomType] };
};

export const getRandomShapeConfig = (
  initialX: number
): { shape: Shape; color: string } => {
  return {
    shape: getRandomShape(initialX - 2),
    color: getRandomColor(),
  };
};

export const SHAPE_CELLS_MAP: (x: number) => Record<ShapeEnum, CellConfig[]> =
  (() => {
    return (initialX: number) => {
      return Object.values(ShapeEnum)
        .filter((key) => typeof key !== 'string')
        .reduce((hash, key: string | ShapeEnum) => {
          hash[key as ShapeEnum] = SHAPE_BUILDERS_MAP[key as ShapeEnum](
            initialX
          ) as CellConfig[];
          return hash;
        }, {} as Record<ShapeEnum, CellConfig[]>) as unknown as Record<
        ShapeEnum,
        CellConfig[]
      >;
    };
  })();
