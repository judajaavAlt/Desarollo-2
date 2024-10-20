import React from "react";
import PropTypes from "prop-types";
import Modal from "../../generics/Modal/Modal";
import InfoGroup from "../../generics/InfoGroup/InfoGroup";
import Button from "../../generics/Button/Button";
import "./CreateTransaction.css";

const CreateTransaction = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear transferencia">
      <InfoGroup label="Transfiera de:">
        <select>
          <option value="Efectivo">Efectivo</option>
          <option value="Bancolombia">Bancolombia</option>
          <option value="Nequi">Nequi</option>
        </select>
      </InfoGroup>

      <InfoGroup label="Transfiera a:">
        <select>
          <option value="Efectivo">Efectivo</option>
          <option value="Bancolombia">Bancolombia</option>
          <option value="Nequi">Nequi</option>
        </select>
      </InfoGroup>

      <InfoGroup label="Cantidad:">
        <input type="number" defaultValue={0} />
      </InfoGroup>

      <InfoGroup label="Fecha:">
        <input type="date" />
      </InfoGroup>

      <InfoGroup label="Comentarios:">
        <textarea></textarea>
      </InfoGroup>

      <div className="button-group">
        <Button text="Crear" className="button-create" />
      </div>
    </Modal>
  );
};

CreateTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateTransaction;
