import { FunctionComponent } from 'react';
import '../styles/GameRow.css';
import { CellConfig } from '../types';
import GameCell from './GameCell';
interface GameRowProps {
  cells: CellConfig[];
}

const GameRow: FunctionComponent<GameRowProps> = ({ cells }) => {
  return (
    <div className="game-row">
      {cells.map((cell) => (
        <GameCell key={cell.id} {...cell} />
      ))}
    </div>
  );
};

export default GameRow;
