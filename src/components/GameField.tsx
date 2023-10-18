import { FunctionComponent, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useGameLoop } from '../hooks';
import { useAppConfig } from '../hooks/useGameConfig';
import { gameRowsState, isEndGame } from '../store';
import '../styles/GameField.css';
import { Row } from '../types';
import GameRow from './GameRow';
interface GameFieldProps {
  isPaused: boolean;
  gameSpeed: number;
  gameOverHandler: () => void;
}

const GameField: FunctionComponent<GameFieldProps> = ({
  isPaused,
  gameOverHandler,
  gameSpeed,
}) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  useAppConfig(fieldRef);
  useGameLoop(isPaused, gameSpeed);

  const rows = useRecoilValue<Row[]>(gameRowsState);
  const isGameOver = useRecoilValue<boolean>(isEndGame);

  useEffect(() => {
    if (isGameOver) {
      gameOverHandler();
    }
  }, [isGameOver]);

  return (
    <div className="game-field" ref={fieldRef}>
      {rows.map((row, index) => (
        <GameRow key={index} cells={row.cells} />
      ))}
    </div>
  );
};

export default GameField;
