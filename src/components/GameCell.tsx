import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import {
  currentShapeCellsState,
  fieldShapesState,
  gameCellState,
  nextShapeAtom,
} from '../store';
import '../styles/GameCell.css';
import { CellConfig } from '../types';
interface GameCellProps extends CellConfig {}

const GameCell: FunctionComponent<GameCellProps> = ({
  x,
  y,
  isStatic,
  color,
}) => {
  const { cellHeight: height, cellWidth: width } =
    useRecoilValue(gameCellState);

  const shapeCells = useRecoilValue<CellConfig[]>(currentShapeCellsState);
  const savedCells = useRecoilValue<CellConfig[]>(fieldShapesState);
  const nextShape = useRecoilValue(nextShapeAtom);

  const activeCellsCollection = isStatic
    ? nextShape?.cells || []
    : [...shapeCells, ...savedCells];

  const activeCell = activeCellsCollection.find(
    ({ x: cX, y: cY }) => x === cX && y === cY
  );

  return (
    <div
      className={classNames('game-cell', { static: isStatic })}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: activeCell?.color,
      }}
    ></div>
  );
};

export default React.memo(GameCell);
