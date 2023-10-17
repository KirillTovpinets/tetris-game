import { useEffect, useState } from 'react';
import GameField from './components/GameField';
import GameOverSceen from './components/GameOverSceen';
import { PauseSceen } from './components/PauseScreen';
import Statistics from './components/Statistics';
import { PAUSE_BUTTON } from './constants';
import './styles/App.css';

function App() {
  const [pause, setPause] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    window.onblur = function () {
      if (gameOver) {
        return;
      }
      setPause(true);
    };
  }, [gameOver]);

  useEffect(() => {
    const handler = ({ code }: KeyboardEvent) => {
      if (code === PAUSE_BUTTON) {
        setPause(!pause);
      }
    };

    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, [pause]);
  return (
    <div className="App">
      <div className="container">
        <GameField isPaused={pause} gameOverHandler={() => setGameOver(true)} />
        <Statistics />
      </div>
      {pause && <PauseSceen />}
      {gameOver && <GameOverSceen />}
    </div>
  );
}

export default App;
