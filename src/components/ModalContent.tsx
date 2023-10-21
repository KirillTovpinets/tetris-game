import { FunctionComponent, PropsWithChildren } from 'react';
import '../styles/ModalContent.css';
interface ModalContentProps extends PropsWithChildren {}

const ModalContent: FunctionComponent<ModalContentProps> = ({ children }) => {
  return <div className="modal-content">{children}</div>;
};

export default ModalContent;
