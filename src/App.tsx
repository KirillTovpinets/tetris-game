import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import GameField from "./components/GameField";
import GameOverSceen from "./components/GameOverSceen";
import { PauseSceen } from "./components/PauseScreen";
import Statistics from "./components/Statistics";
import WelcomeScreen from "./components/WelcomeScreen";
import {
  GAME_SPEED,
  PAUSE_BUTTON,
  SPEED_CHANGE_INTERVAL_IN_MINUTES,
  SPEED_STEP,
} from "./constants";
import { speedLevelAtom } from "./store";
import "./styles/App.css";

function App() {
  const [pause, setPause] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(GAME_SPEED);
  const [speedTimerId, setSpeedTimerId] = useState<any>(null);
  const setSpeedLevel = useSetRecoilState(speedLevelAtom);
  const [startTheGame, setStartTheGame] = useState(false);

  useEffect(() => {
    if (gameOver && speedTimerId) {
      clearInterval(speedTimerId);
      return;
    }
    window.onblur = function () {
      if (gameOver) {
        return;
      }
      setPause(true);
    };
  }, [gameOver, speedTimerId]);

  useEffect(() => {
    if (!startTheGame) {
      return;
    }

    const timerId = setInterval(
      () => {
        setGameSpeed((speed) => speed - SPEED_STEP);
        setSpeedLevel((level) => {
          return level + 1;
        });
      },
      SPEED_CHANGE_INTERVAL_IN_MINUTES * 60 * 1000
    );

    setSpeedTimerId(timerId);
    return () => clearInterval(timerId);
  }, [startTheGame]);

  useEffect(() => {
    const handler = ({ code }: KeyboardEvent) => {
      if (code === PAUSE_BUTTON) {
        setPause(!pause);
      }
    };

    if (pause) {
      clearInterval(speedTimerId);
    }

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [pause, speedTimerId]);

  return (
    <div className="App">
      {startTheGame && (
        <div className="container">
          <GameField
            isPaused={pause}
            gameOverHandler={() => setGameOver(true)}
            gameSpeed={gameSpeed}
          />
          <Statistics />
        </div>
      )}
      {pause && <PauseSceen />}
      {gameOver && <GameOverSceen />}
      {!startTheGame && (
        <WelcomeScreen startGame={() => setStartTheGame(true)} />
      )}
    </div>
  );
}

export default App;
