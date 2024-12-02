import React from 'react';
import PropTypes from 'prop-types';
import './ReadWalletModal';

function ConfirmationDialog({ message, onCancel, onConfirm }) {
  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <p>{message}</p>
        <div className="confirmation-dialog-buttons">
          <button className="confirmation-dialog-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="confirmation-dialog-confirm" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
