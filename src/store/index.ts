import { atom, selector } from 'recoil';
import {
  CellConfig,
  CellSize,
  GameConfig,
  Row,
  Shape,
  ShapeEnum,
} from '../types';
export const gameAtom = atom<GameConfig>({
  key: 'game-config',
  default: {
    rows: [],
    cellHeight: 0,
    cellWidth: 0,
    initialX: 0,
  },
});

export const speedLevelAtom = atom<number>({
  key: 'speed-level',
  default: 1,
});

export const rowBurnedAtom = atom<number>({
  key: 'rows-burned',
  default: 0,
});

export const fieldShapesState = atom<CellConfig[]>({
  key: 'field-shapes',
  default: [],
});

export const shapeAtom = atom<Shape>({
  key: 'shape',
  default: {
    type: ShapeEnum.I,
    cells: [],
  },
});

export const nextShapeAtom = atom<Shape | null>({
  key: 'next-shape',
  default: null,
});

export const currentShapeTypeState = selector<ShapeEnum>({
  key: 'current-shape',
  get: ({ get }) => {
    const shape = get(shapeAtom);

    return shape.type;
  },
});

export const isAtTheBottom = selector<boolean>({
  key: 'the-bottomest-Y',
  get: ({ get }) => {
    const cells = get(currentShapeCellsState);
    const cellsX = cells.map((cell) => cell.x);
    const cellsY = cells.map((cell) => cell.y);

    const savedCells = get(fieldShapesState);

    const gameRows = get(gameRowsState);
    const shapeIsAtTheBottom = cellsY.includes(gameRows.length - 1);
    if (savedCells.length === 0) {
      return shapeIsAtTheBottom;
    }
    const cellsUnderTheShape = savedCells.filter(
      (cell) =>
        cellsX.includes(cell.x) &&
        cell.y >
          Math.max(...cells.filter((c) => c.x === cell.x).map((c) => c.y))
    );

    const isCollapsed = !!cellsUnderTheShape.find(
      (cell) =>
        !!cells.find(
          (shapeCell) => shapeCell.x === cell.x && shapeCell.y === cell.y - 1
        )
    );
    console.log(cellsUnderTheShape);
    console.log(
      'closest Y under the shape = ' +
        Math.min(...cellsUnderTheShape.map((cell) => cell.y))
    );
    console.log('closest Y above the field = ' + Math.max(...cellsY));

    console.log(isCollapsed);
    return !!isCollapsed || shapeIsAtTheBottom;
  },
});
export const currentShapeCellsState = selector<CellConfig[]>({
  key: 'current-shape-cells',
  get: ({ get }) => {
    const shape = get(shapeAtom);

    return shape.cells;
  },
});

export const leftShapeEdgeX = selector<number>({
  key: 'left-edge',
  get: ({ get }) => {
    const cells = get(currentShapeCellsState);

    return Math.min(...cells.map((c) => c.x));
  },
});

export const rightShapeEdgeX = selector<number>({
  key: 'right-edge',
  get: ({ get }) => {
    const cells = get(currentShapeCellsState);

    return Math.max(...cells.map((c) => c.x));
  },
});

export const isEndGame = selector<boolean>({
  key: 'is-end-game',
  get: ({ get }) => {
    const shape = get(shapeAtom);

    const isCollapsed = get(isAtTheBottom);

    const isAtTheTop = Math.min(...shape.cells.map((cell) => cell.y)) === 0;

    return isCollapsed && isAtTheTop;
  },
});

export const gameRowsState = selector<Row[]>({
  key: 'game-cells',
  get: ({ get }) => {
    const config = get(gameAtom);

    return config.rows;
  },
});

export const gameCellState = selector<CellSize>({
  key: 'cell-size',
  get: ({ get }) => {
    const { cellHeight, cellWidth } = get(gameAtom);

    return {
      cellHeight,
      cellWidth,
    };
  },
});
