import React from 'react';
import './Button.css';

const Button = ({ text, onClick, className }) => (
    <button className={`button-create ${className}`} onClick={onClick}>
        {text}
    </button>
);

export default Button;

