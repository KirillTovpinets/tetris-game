import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  DIRECTIONS,
  GAME_SPEED,
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
  shapeAtom,
} from './store';
import { KeyboardCodes, Row, Shape } from './types';

export const useKeyboardHanlder = (isPaused: boolean) => {
  const rows = useRecoilValue<Row[]>(gameRowsState);
  const shape = useRecoilValue<Shape>(shapeAtom);
  const isGameOver = useRecoilValue<boolean>(isEndGame);

  const { updateShape } = useUpdateShape(isPaused);

  useEffect(() => {
    const keydownHanlder = ({ code }: KeyboardEvent) => {
      if (!DIRECTIONS.includes(code as KeyboardCodes)) {
        return;
      }

      const minX = Math.min(...shape.cells.map((c) => c.x));
      const maxX = Math.max(...shape.cells.map((c) => c.x));

      if (
        (code === KeyboardCodes.left && minX === 0) ||
        (code === KeyboardCodes.right && maxX === rows[0].cells.length - 1)
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
  }, [rows, shape, isGameOver]);
};

export const useUpdateShape = (isPaused: boolean) => {
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
    }, GAME_SPEED);
    setTimerId(timer);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused]);

  return { updateShape, timerId };
};

export const useGameLoop = (isPaused: boolean) => {
  const rows = useRecoilValue<Row[]>(gameRowsState);
  const shape = useRecoilValue<Shape>(shapeAtom);
  const nextShape = useRecoilValue<Shape | null>(nextShapeAtom);

  const [shapes, setShapes] = useRecoilState(fieldShapesState);
  const setSavedCells = useSetRecoilState(fieldShapesState);

  const isEndOfLoop = useRecoilValue<boolean>(isAtTheBottom);
  const setShape = useSetRecoilState(shapeAtom);

  useKeyboardHanlder(isPaused);

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
      }, ROW_DISAPPEAR_SPEED);
    }
    setShapes([...shapes, ...shape.cells]);

    setShape({
      ...shape,
      ...nextShape,
    });
  }, [isEndOfLoop, rows, nextShape]);
};
