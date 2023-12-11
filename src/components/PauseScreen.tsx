import { Modal, Pause } from "@repo/ui";
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
