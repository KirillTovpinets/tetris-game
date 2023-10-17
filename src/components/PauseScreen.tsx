import { ReactComponent as Pause } from '../assets/pause.svg';
import '../styles/PauseScreen.css';
import { Modal } from './Modal';
export const PauseSceen = () => {
  return (
    <Modal>
      <Pause className="snake-icon" />
    </Modal>
  );
};
