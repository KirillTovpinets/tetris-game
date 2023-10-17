import { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { shapePreviewFieldAtom } from '../store';
import '../styles/NextShapePreview.css';
import GameRow from './GameRow';
interface NextShapePreviewProps {}

const NextShapePreview: FunctionComponent<NextShapePreviewProps> = () => {
  const previewRows = useRecoilValue(shapePreviewFieldAtom);
  return (
    <div className="next-shape-preview">
      {previewRows.map((row, index) => (
        <GameRow key={index} cells={row.cells} />
      ))}
    </div>
  );
};

export default NextShapePreview;
