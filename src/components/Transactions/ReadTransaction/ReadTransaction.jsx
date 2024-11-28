import "./ReadTransaction.css";
import React from "react";
import PropTypes from "prop-types";
import Modal from "../../generics/Modal/Modal";
import InfoGroup from "../../generics/InfoGroup/InfoGroup";
import Button from "../../generics/Button/Button";
import { readWallet } from "../../../helpers/portWallets";
import { useState, useEffect } from "react";

const ReadTransaction = ({ isOpen, onClose, infoTransaction }) => {

  console.log(infoTransaction);
  const [dataWallet, setDataWallet] = useState([]);

  useEffect(() => {
    const traer = async () => {
      try {
        const obtener = await readWallet(1);
        setDataWallet(obtener);
        console.log(obtener);
      } catch (e) {
        console.error("Error al cargar categorías:", e);
      }
    };
    traer();
  }, []);

  if (!infoTransaction) {
    return null
  }
  
  console.log(infoTransaction.transactionDate)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"Información de la transacción"}
    >
      <InfoGroup label={"Transferido de:"}>
        <label className="label-info-transaction"> {dataWallet[infoTransaction.from - 1].walletName} </label>
      </InfoGroup>
      <InfoGroup label={"Transferido a:"}>
        <label className="label-info-transaction"> {dataWallet[infoTransaction.destination - 1].walletName} </label>
      </InfoGroup>
      <InfoGroup label={"Cantidad:"}>
        <label className="info-amount">{infoTransaction.transactionAmount} COL$</label>
      </InfoGroup>
      <InfoGroup label={"Fecha:"}>
        <label className="info-date">{infoTransaction.transactionDate}</label>
      </InfoGroup>
      <InfoGroup label={"Comentarios:"}>
        <textarea
          className="info-comments"
          readOnly
          defaultValue={infoTransaction.transactionName}
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
