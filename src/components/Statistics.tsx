import { FunctionComponent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getRandomColor, getRandomShape } from '../helpers';
import { isAtTheBottom, nextShapeAtom } from '../store';
import '../styles/Statistics.css';
import NextShapePreview from './NextShapePreview';

interface StatisticsProps {}

const Statistics: FunctionComponent<StatisticsProps> = () => {
  const [nextShape, setNextShape] = useRecoilState(nextShapeAtom);

  const isEndOfLoop = useRecoilValue(isAtTheBottom);
  useEffect(() => {
    if (!isEndOfLoop) {
      return;
    }

    const randomShape = getRandomShape();
    const randomColor = getRandomColor();
    setNextShape({
      ...randomShape,
      cells: randomShape.cells.map((cell) => ({ ...cell, color: randomColor })),
    });
  }, [isEndOfLoop]);
  return (
    <div className="statistics">
      <NextShapePreview />
    </div>
  );
};

export default Statistics;
