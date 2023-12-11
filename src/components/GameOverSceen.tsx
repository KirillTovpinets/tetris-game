import { FunctionComponent } from 'react';
import { Modal } from 'ui';

interface GameOverSceenProps { }

const GameOverSceen: FunctionComponent<GameOverSceenProps> = () => {
  return (
    <Modal>
      <div className="game-over-sceen">
        <h2>GAME OVER</h2>
      </div>
    </Modal>
  );
};

export default GameOverSceen;
