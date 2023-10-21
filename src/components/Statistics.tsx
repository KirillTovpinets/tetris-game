import { FunctionComponent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getRandomColor, getRandomShape } from '../helpers';
import {
  fieldShapesState,
  gameAtom,
  isAtTheBottom,
  nextShapeAtom,
  rowBurnedAtom,
  speedLevelAtom,
} from '../store';
import '../styles/Statistics.css';
import NextShapePreview from './NextShapePreview';

interface StatisticsProps {}

const Statistics: FunctionComponent<StatisticsProps> = () => {
  const [nextShape, setNextShape] = useRecoilState(nextShapeAtom);
  const { initialX } = useRecoilValue(gameAtom);
  const isEndOfLoop = useRecoilValue(isAtTheBottom);
  const speedLevel = useRecoilValue(speedLevelAtom);
  const fieldCells = useRecoilValue(fieldShapesState);
  const rowsBurned = useRecoilValue(rowBurnedAtom);

  useEffect(() => {
    if (!isEndOfLoop) {
      return;
    }

    const randomShape = getRandomShape(initialX);
    const randomColor = getRandomColor();
    setNextShape({
      ...randomShape,
      cells: randomShape.cells.map((cell) => ({ ...cell, color: randomColor })),
    });
  }, [isEndOfLoop]);
  return (
    <div className="statistics">
      <NextShapePreview />
      <hr />
      <span className="statistic-item">
        <span className="title">Your speed</span>
        <span className="value"> {speedLevel} level</span>
      </span>
      <span className="statistic-item">
        <span className="title">Cells on field</span>
        <span className="value">{fieldCells.length} cells</span>
      </span>
      <span className="statistic-item">
        <span className="title">Rows burned</span>
        <span className="value">{rowsBurned} rows</span>
      </span>
      <hr />
      <p className="description">
        Press <code>P</code> key to pause the game
      </p>
    </div>
  );
};

export default Statistics;
