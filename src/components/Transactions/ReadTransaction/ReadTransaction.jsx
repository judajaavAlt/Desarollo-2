import "./ReadTransaction.css";
import React from "react";
import PropTypes from "prop-types";
import Modal from "../../generics/Modal/Modal";
import InfoGroup from "../../generics/InfoGroup/InfoGroup";
import Button from "../../generics/Button/Button";

const ReadTransaction = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"Información de la transacción"}
    >
      <InfoGroup label={"Transferido de:"}>
        <label className="label-info-transaction"> Bancolombia </label>
      </InfoGroup>
      <InfoGroup label={"Transferido a:"}>
        <label className="label-info-transaction"> Nequi </label>
      </InfoGroup>
      <InfoGroup label={"Cantidad:"}>
        <label className="info-amount">1000</label>
      </InfoGroup>
      <InfoGroup label={"Fecha:"}>
        <label className="info-date">10/08/2024</label>
      </InfoGroup>
      <InfoGroup label={"Comentarios:"}>
        <textarea
          className="info-comments"
          readOnly
          defaultValue={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          }
        ></textarea>
      </InfoGroup>
      <div className="button-group">
        <Button text={"Editar"}></Button>
        <Button text={"Borrar"}></Button>
      </div>
    </Modal>
  );
};

ReadTransaction.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default ReadTransaction;
