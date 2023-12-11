import { Modal } from "ui";
import Pause from "../assets/pause.svg";
import "../styles/PauseScreen.css";
export const PauseSceen = () => {
  return (
    <Modal>
      <div className="snake-icon">
        <Pause />
      </div>
    </Modal>
  );
};
