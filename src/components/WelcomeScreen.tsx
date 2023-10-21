import { FunctionComponent } from 'react';
import '../styles/WelcomeScreen.css';
import { Modal } from './Modal';
import ModalContent from './ModalContent';

interface WelcomeScreenProps {}

const WelcomeScreen: FunctionComponent<WelcomeScreenProps> = () => {
  return (
    <Modal>
      <ModalContent>
        Use your keyboards to move the shape around the game field
        <div className="arrows">
          <span className="arrow top"></span>
          <span className="arrow right"></span>
          <span className="arrow bottom"></span>
          <span className="arrow left"></span>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default WelcomeScreen;
