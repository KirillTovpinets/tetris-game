import { PropsWithChildren } from 'react';
import '../styles/Modal.css';
interface Props extends PropsWithChildren {}
export const Modal = ({ children }: Props) => {
  return <div className="snake-modal-window">{children}</div>;
};
