import React from 'react';
import './Modal.css';

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="contenedor-modal">
                <div className="encabezado-modal">
                    <h2>{title}</h2>
                    <button className="button-close" onClick={onClose}>X</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
