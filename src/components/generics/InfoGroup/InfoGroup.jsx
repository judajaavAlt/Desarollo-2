import React from 'react';
import './InfoGroup.css';

const InfoGroup = ({ label, children }) => (
    <div className="info-group">
        <label>{label}</label>
        {children}
    </div>
);

export default InfoGroup;

