import Pause from "../assets/pause.svg";
import "../styles/PauseScreen.css";
import { Modal } from "./Modal";
export const PauseSceen = () => {
  console.log(Pause);
  return (
    <Modal>
      <div className="snake-icon">
        <Pause />
      </div>
    </Modal>
  );
};
