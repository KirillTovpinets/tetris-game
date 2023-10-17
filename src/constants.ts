import { ArrowMeta, CellConfig, KeyboardCodes, ShapeEnum } from './types';

export const CELL_WIDTH_PERCENTAGE = 5;
export const GAME_SPEED = 700;
export const ROW_DISAPPEAR_SPEED = 200;
export const SHAPE_RECTANGLE_CELLS = 4;

export const COLORS = ['red', 'green', 'blue', 'orange', 'purple'];

const AVAILABLE_SHAPES = [
  ShapeEnum.I,
  ShapeEnum.L,
  ShapeEnum.O,
  ShapeEnum.T,
  ShapeEnum.Z,
];
export const SHAPE_TYPES = Object.values(ShapeEnum).filter(
  (key) => typeof key !== 'string' && AVAILABLE_SHAPES.includes(key)
);

export const DIRECTIONS: KeyboardCodes[] = [
  KeyboardCodes.down,
  KeyboardCodes.left,
  KeyboardCodes.up,
  KeyboardCodes.right,
];

export const PAUSE_BUTTON = 'KeyP';

export const UPDATE_FUNCTIONS_MAP = {
  [KeyboardCodes.down]:
    ({ nextBottomIndex }: ArrowMeta) =>
    (cell: CellConfig) => ({
      ...cell,
      y: cell.y + 1,
    }),
  [KeyboardCodes.right]: () => (cell: CellConfig) => ({
    ...cell,
    x: cell.x + 1,
  }),
  [KeyboardCodes.left]: () => (cell: CellConfig) => ({
    ...cell,
    x: cell.x - 1,
  }),
  [KeyboardCodes.up]:
    ({ middleX, middleY }: ArrowMeta) =>
    (cell: CellConfig) => {
      if (!middleX || !middleY || (cell.x === middleX && cell.y === middleY)) {
        return cell;
      }

      const dX = cell.x - middleX;
      const dY = cell.y - middleY;

      let newX = cell.x;
      let newY = cell.y;

      if (dX === 0) {
        newX = newX - dY;
        newY = newY - dY;
      } else if (dY === 0) {
        newX = newX - dX;
        newY = newY + dX;
      } else {
        newX = newX - (dX + dY);
        newY = newY - (dY - dX);
      }

      return {
        ...cell,
        x: newX,
        y: newY,
      };
    },
};
