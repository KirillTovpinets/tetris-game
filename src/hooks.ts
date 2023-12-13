import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  DIRECTIONS,
  ROW_DISAPPEAR_SPEED,
  UPDATE_FUNCTIONS_MAP,
} from './constants';
import { getCenterCell } from './helpers';
import {
  fieldShapesState,
  gameRowsState,
  isAtTheBottom,
  isEndGame,
  nextShapeAtom,
  rowBurnedAtom,
  shapeAtom,
} from './store';
import { CellConfig, KeyboardCodes, Row, Shape } from './types';

export const useKeyboardHanlder = (isPaused: boolean, speed: number) => {
  const rows = useRecoilValue<Row[]>(gameRowsState);
  const shape = useRecoilValue<Shape>(shapeAtom);
  const isGameOver = useRecoilValue<boolean>(isEndGame);
  const savedCells = useRecoilValue<CellConfig[]>(fieldShapesState);

  const { updateShape } = useUpdateShape(isPaused, speed);

  useEffect(() => {
    const keydownHanlder = ({ code }: KeyboardEvent) => {
      if (!DIRECTIONS.includes(code as KeyboardCodes)) {
        return;
      }

      const minX = Math.min(...shape.cells.map((c) => c.x));
      const maxX = Math.max(...shape.cells.map((c) => c.x));

      const isShapeOnRightSide =
        code === KeyboardCodes.right &&
        !!savedCells.find(
          (cell) =>
            !!shape.cells.find((c) => c.x === cell.x - 1 && c.y === cell.y)
        );

      const isShapeOnLeftSide =
        code === KeyboardCodes.left &&
        !!savedCells.find(
          (cell) =>
            !!shape.cells.find((c) => c.x === cell.x + 1 && c.y === cell.y)
        );

      const isAtTheLeftEdge = code === KeyboardCodes.left && minX === 0;
      const isAtTheRightEdge =
        code === KeyboardCodes.right && maxX === (rows[0]?.cells.length || 0) - 1;
      if (
        isAtTheLeftEdge ||
        isAtTheRightEdge ||
        isShapeOnLeftSide ||
        isShapeOnRightSide
      ) {
        return;
      }

      updateShape(code as KeyboardCodes);
    };

    if (isGameOver) {
      document.removeEventListener('keydown', keydownHanlder);
      return;
    }
    document.addEventListener('keydown', keydownHanlder);

    return () => document.removeEventListener('keydown', keydownHanlder);
  }, [rows, shape, isGameOver, savedCells]);
};

export const useUpdateShape = (isPaused: boolean, speed: number) => {
  const setShape = useSetRecoilState(shapeAtom);
  const [timerId, setTimerId] = useState<any | null>(null);

  const isGameOver = useRecoilValue<boolean>(isEndGame);

  useEffect(() => {
    if (isGameOver) {
      clearInterval(timerId);
    }
  }, [isGameOver]);

  const updateShape = (keyPressed?: KeyboardCodes) => {
    setShape(({ cells, ...prevShape }) => {
      const { x, y } = getCenterCell(cells);

      const direction = keyPressed ? keyPressed : KeyboardCodes.down;

      const updatedCells = cells.map(
        UPDATE_FUNCTIONS_MAP[direction]({
          middleX: x,
          middleY: y,
        })
      );
      return {
        ...prevShape,
        cells: updatedCells,
      } as Shape;
    });
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }
    const timer = setInterval(() => {
      updateShape();
    }, speed);
    setTimerId(timer);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, speed]);

  return { updateShape, timerId };
};

export const useGameLoop = (isPaused: boolean, gameSpeed: number) => {
  const rows = useRecoilValue<Row[]>(gameRowsState);
  const shape = useRecoilValue<Shape>(shapeAtom);
  const nextShape = useRecoilValue<Shape | null>(nextShapeAtom);

  const [shapes, setShapes] = useRecoilState(fieldShapesState);
  const setSavedCells = useSetRecoilState(fieldShapesState);
  const setRowBurnedCount = useSetRecoilState(rowBurnedAtom);

  const isEndOfLoop = useRecoilValue<boolean>(isAtTheBottom);
  const setShape = useSetRecoilState(shapeAtom);

  useKeyboardHanlder(isPaused, gameSpeed);

  useEffect(() => {
    if (!isEndOfLoop || !nextShape) {
      return;
    }

    const shapesCollection = [...shapes, ...shape.cells];
    const rowColumns = shapesCollection.reduce((map, cell) => {
      if (map[cell.y] !== undefined) {
        map[cell.y]++;
      } else {
        map[cell.y] = 1;
      }
      return map;
    }, {} as Record<number, number>);

    const filledRows = Object.entries(rowColumns).filter(
      ([key, value]: [string, number]) => value === rows.length
    );

    if (filledRows.length !== 0) {
      const rowIndexs = filledRows.map(([key]) => parseInt(key));

      const belowCollection = shapesCollection.filter(
        (item) => item.y > Math.max(...rowIndexs)
      );
      const cellsAbove = shapesCollection.filter(
        (item) => item.y < Math.min(...rowIndexs)
      );

      setTimeout(() => {
        setSavedCells([
          ...cellsAbove.map((cell) => ({
            ...cell,
            y: cell.y + rowIndexs.length,
          })),
          ...belowCollection,
        ]);
        setRowBurnedCount((count) => filledRows.length + count);
      }, ROW_DISAPPEAR_SPEED);
    }
    setShapes([...shapes, ...shape.cells]);

    setShape({
      ...shape,
      ...nextShape,
    });
  }, [isEndOfLoop, rows, nextShape]);
};
