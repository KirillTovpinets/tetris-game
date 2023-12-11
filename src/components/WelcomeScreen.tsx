import { Modal } from '@repo/ui';
import { FunctionComponent } from 'react';
import '../styles/WelcomeScreen.css';
import ModalContent from './ModalContent';

interface WelcomeScreenProps {
  startGame: () => void;
}

const WelcomeScreen: FunctionComponent<WelcomeScreenProps> = ({
  startGame,
}) => {
  return (
    <Modal>
      <ModalContent>
        <p>Use your keyboards to move the shape around the game field</p>
        <div className="arrows">
          <div className="first-row">
            <span className="arrow top"></span>
          </div>
          <div className="second-row">
            <span className="arrow left"></span>
            <span className="arrow bottom"></span>
            <span className="arrow right"></span>
          </div>
        </div>

        <p>
          You can click <span className="key">P</span> button to pause the game
        </p>

        <div className="actions">
          <button className="start-btn" onClick={startGame}>
            Start
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default WelcomeScreen;
