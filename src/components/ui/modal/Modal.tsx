'use client';

import './style.css';
import Button from '@components/buttons/Button';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => any;
  modalHeader: string;
  modalBody: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  modalHeader,
  modalBody,
}: ModalProps) {
  return (
    <>
      <div className={`modal-overlay ${isOpen ? 'modal-overlay--visible' : ''}`}>
        <div className={`modal-container ${isOpen ? 'modal-container--visible' : ''}`}>
          <div className="modal-header">{modalHeader}</div>
          <div className="modal-body">{modalBody}</div>
          <div className="modal-footer">
            <Button value="închide" variant="secondary" size="medium" onClick={onClose} />
            <Button value="confirm" variant="primary" size="medium" onClick={onConfirm} />
          </div>
        </div>
      </div>
    </>
  );
}
