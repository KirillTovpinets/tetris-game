import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { PREIVEW_CLASSES } from '../constants';
import { nextShapeAtom } from '../store';
import '../styles/NextShapePreview.css';
import { ShapeEnum } from '../types';
interface NextShapePreviewProps {}

const NextShapePreview: FunctionComponent<NextShapePreviewProps> = () => {
  const nextShape = useRecoilValue(nextShapeAtom);
  if (!nextShape) {
    return null;
  }

  const numRows = nextShape.cells.reduce((arr, cell) => {
    if (!arr.includes(cell.y)) {
      arr.push(cell.y);
    }

    return arr;
  }, [] as number[]);

  const minX = Math.min(...nextShape.cells.map((c) => c.x));
  return (
    <div
      className={classNames(
        'next-shape-preview',
        PREIVEW_CLASSES[nextShape.type]
      )}
    >
      {numRows.map((row) => {
        return (
          <div className="shape-row" key={row}>
            {nextShape?.cells
              .filter((c) => c.y === row)
              .map((cell, index, array) => (
                <div
                  key={index}
                  className={classNames('shape-cell', {
                    shift:
                      cell.x === minX &&
                      (nextShape.type === ShapeEnum.Z ||
                        nextShape.type === ShapeEnum.N),
                  })}
                ></div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default NextShapePreview;
