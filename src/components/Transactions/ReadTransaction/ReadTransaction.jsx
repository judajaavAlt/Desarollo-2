import "./ReadTransaction.css";
import React from "react";
import PropTypes from "prop-types";
import Modal from "../../generics/Modal/Modal";
import InfoGroup from "../../generics/InfoGroup/InfoGroup";
import Button from "../../generics/Button/Button";
import { readWallet } from "../../../helpers/portWallets";
import { useState, useEffect } from "react";
import DeleteTransaction from "../DeleteTransaction/DeleteTransaction";
import UpdateTransaction from "../UpdateTransaction/UpdateTransaction";

const ReadTransaction = ({ isOpen, onClose, infoTransaction }) => {

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [selectedTransactionID, setSelectedTransactionID] = useState(null);

  //console.log(infoTransaction);
  const [dataWallet, setDataWallet] = useState([]);

  useEffect(() => {
    const traer = async () => {
      try {
        const obtener = await readWallet(1);
        setDataWallet(obtener);
        //console.log(obtener);
      } catch (e) {
        console.error("Error al cargar categorías:", e);
      }
    };
    traer();
  }, []);

  if (!infoTransaction ) {
    return null
  }

  //console.log(infoTransaction.transactionDate)

  const openModalDelete = (id) => {
    setIsModalOpenDelete(true);
    setSelectedTransactionID(id);
  };

  const closeModalDelete = () => {
    setIsModalOpenDelete(false);
    setSelectedTransactionID(null);
    onClose();
  };

   const openModalUpdate = () => {
     setIsModalOpenUpdate(true);
   };

   const closeModalUpdate = () => {
     setIsModalOpenUpdate(false);
   };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"Información de la transacción"}
    >
      <InfoGroup label={"Transferido de:"}>
        <label className="label-info-transaction"> {
                  dataWallet.find(
                    (wallet) => wallet.walletID === infoTransaction.from
                  ).walletName
                } </label>
      </InfoGroup>
      <InfoGroup label={"Transferido a:"}>
        <label className="label-info-transaction"> {
                  dataWallet.find(
                    (wallet) => wallet.walletID === infoTransaction.destination
                  ).walletName
                } </label>
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
        <Button text={"Editar"} onClick={openModalUpdate}></Button>
        <Button text={"Borrar"} onClick={()=> openModalDelete(infoTransaction.transactionID)}></Button>
      </div>
      <DeleteTransaction isOpen={isModalOpenDelete} onClose={closeModalDelete} transactionID={selectedTransactionID}/>
      <UpdateTransaction isOpen={isModalOpenUpdate} onClose={closeModalUpdate}/>
    </Modal>
  );
};

ReadTransaction.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default ReadTransaction;
