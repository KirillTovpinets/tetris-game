import { CellConfig } from './types';

const SHAPE_CELL_COUNT = 4;

const buildIShape = (initialX: number): CellConfig[] => {
  const cells: CellConfig[] = [];
  for (let i = 0; i < SHAPE_CELL_COUNT; i++) {
    cells.push({ x: i + initialX, y: 0 });
  }

  return cells;
};

const buildNShape = (initialX: number): CellConfig[] => {
  const cells: CellConfig[] = [];

  for (let i = 0; i < SHAPE_CELL_COUNT / 2; i++) {
    cells.push({ x: 1 + i + initialX, y: 0 });
  }

  for (let i = 0; i < SHAPE_CELL_COUNT / 2; i++) {
    cells.push({ x: i + initialX, y: 1 });
  }

  return cells;
};

const buildTShape = (initialX: number): CellConfig[] => {
  const cells: CellConfig[] = [];
  for (let i = 0; i < SHAPE_CELL_COUNT - 1; i++) {
    cells.push({ x: i + initialX, y: 0 });
  }
  const middle = Math.floor((SHAPE_CELL_COUNT - 1) / 2);
  cells.push({ x: middle + initialX, y: 1 });

  return cells;
};

const buildZShape = (initialX: number): CellConfig[] => {
  const cells: CellConfig[] = [];

  for (let i = 0; i < SHAPE_CELL_COUNT / 2; i++) {
    cells.push({ x: i + initialX, y: 0 });
  }

  for (let i = 0; i < SHAPE_CELL_COUNT / 2; i++) {
    cells.push({ x: i + 1 + initialX, y: 1 });
  }

  return cells;
};

const buildLShape = (initialX: number): CellConfig[] => {
  const cells: CellConfig[] = [];

  let i;
  for (i = 0; i < SHAPE_CELL_COUNT - 1; i++) {
    cells.push({ x: initialX, y: i });
  }

  cells.push({ x: 1 + initialX, y: i - 1 });
  return cells;
};

const buildOShape = (initialX: number): CellConfig[] => {
  const cells: CellConfig[] = [];

  for (let i = 0; i < SHAPE_CELL_COUNT / 2; i++) {
    cells.push({ x: i + initialX, y: 0 });
  }
  for (let i = 0; i < SHAPE_CELL_COUNT / 2; i++) {
    cells.push({ x: i + initialX, y: 1 });
  }

  return cells;
};

const shapeFactories = {
  buildIShape,
  buildLShape,
  buildNShape,
  buildOShape,
  buildTShape,
  buildZShape,
};
export default shapeFactories;
