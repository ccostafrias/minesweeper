// components/ui/Modal.jsx
import Modal from 'react-modal'
import '../styles/Modal.css';

Modal.setAppElement('#root') // importante para acessibilidade

export default function CustomModal({ isOpen, onRequestClose, onAfterClose, title, children, footer }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterClose={onAfterClose}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      className="modal-content-base"
      overlayClassName="modal-overlay"
      closeTimeoutMS={300} // tempo da transição em ms
    >
      <div className="modal-title">{title}</div>
      <div className="modal-content">{children}</div>
      <div className="modal-footer">{footer}</div>
    </Modal>
  )
}