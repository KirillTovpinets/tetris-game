import { atom, selector } from 'recoil';
import { v4 as uuid } from 'uuid';
import { SHAPE_RECTANGLE_CELLS } from '../constants';
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
  },
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

export const shapePreviewFieldAtom = atom<Row[]>({
  key: 'shape-preview-field',
  default: (() => {
    const rows: Row[] = [];
    for (let i = 0; i < SHAPE_RECTANGLE_CELLS; i++) {
      const row: Row = {
        cells: [],
      };
      for (let j = 0; j < SHAPE_RECTANGLE_CELLS; j++) {
        row.cells.push({
          id: uuid(),
          x: j,
          y: i,
          isStatic: true,
        });
      }
      rows.push(row);
    }
    return rows;
  })(),
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
    const cellsUnderTheShape = savedCells.filter((cell) =>
      cellsX.includes(cell.x)
    );

    const isCollapsed = cellsUnderTheShape.find(
      (cell) =>
        !!cells.find(
          (shapeCell) => shapeCell.x === cell.x && shapeCell.y >= cell.y - 1
        )
    );
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
