import { RefObject, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';
import { CELL_WIDTH_PERCENTAGE } from '../constants';
import { getRandomShapeConfig } from '../helpers';
import { gameAtom, nextShapeAtom, shapeAtom } from '../store';
import { CellConfig, Row } from '../types';

export const useAppConfig = (fieldRef: RefObject<HTMLDivElement>) => {
  const [_, setGameConfig] = useRecoilState(gameAtom);
  const setShape = useSetRecoilState(shapeAtom);
  const [nextShape, setNextShape] = useRecoilState(nextShapeAtom);
  useEffect(() => {
    if (!fieldRef || !fieldRef.current) {
      return;
    }

    const fieldWidth = (fieldRef.current as HTMLDivElement).clientWidth;
    const fieldHeight = (fieldRef.current as HTMLDivElement).clientHeight;

    const ratio = fieldHeight / fieldWidth;

    const width = fieldWidth * (CELL_WIDTH_PERCENTAGE / 100);
    const height = width * ratio;

    const cellRowCount = Math.ceil(fieldWidth / width);
    const initialX = Math.floor(cellRowCount / 2);
    const numRows = Math.floor(fieldHeight / height);

    const rows: Row[] = Array.from({ length: numRows }).map((_, rowIndex) => {
      const cellCollection = Array.from({ length: cellRowCount }).map(
        (_, colIndex) => {
          const x = colIndex;
          const y = rowIndex;

          const id = uuid();
          const cell: CellConfig = {
            id,
            x,
            y,
          };
          return cell;
        }
      );

      return {
        cells: cellCollection,
      };
    });

    setGameConfig({
      rows,
      cellHeight: height,
      cellWidth: width,
      initialX,
    });

    const { shape, color } = getRandomShapeConfig(initialX);
    setShape({
      ...shape,
      cells: shape.cells.map((cell) => ({ ...cell, color })),
    });

    const { shape: nextShape, color: nextColor } =
      getRandomShapeConfig(initialX);
    setNextShape({
      ...nextShape,
      cells: nextShape.cells.map((cell) => ({ ...cell, color: nextColor })),
    });
  }, [fieldRef]);
};
