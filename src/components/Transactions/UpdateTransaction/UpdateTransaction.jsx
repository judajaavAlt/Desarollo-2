import PropTypes from "prop-types";
import Modal from "../../generics/Modal/Modal";
import Button from "../../generics/Button/Button";
import InfoGroup from "../../generics/InfoGroup/InfoGroup";
import { useState, useEffect } from "react";
import { readWallet } from "../../../helpers/portWallets";
import { updateTransaction } from "../../../helpers/portTransaccion";

const UpdateTransaction = ({ isOpen, onClose, infoTransaction }) => {
  const [updateITransaction, setUpdateITransaction] = useState(infoTransaction);
  const [dataWallet, setDataWallet] = useState([]);

  useEffect(() => {
    const fecthWallets = async () => {
      try {
        const wallets = await readWallet(1);
        setDataWallet(wallets);
      } catch (error) {
        console.error("Error al cargar las billeteras:", error);
      }
    };
    fecthWallets();
  }, []);

  const handlePropertyChange = (event) => {
    const newValue = event.target.value;
    const nameProp = event.target.name;
    setUpdateITransaction((prevState) => ({
      ...prevState,
      [nameProp]: newValue,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateTransaction(
        updateITransaction.transactionID,
        updateITransaction.transactionDate,
        updateITransaction.transactionName,
        updateITransaction.transactionAmount,
        updateITransaction.destination,
        updateITransaction.from,
      );
      console.log("Transacción creada exitosamente.");
      onClose();
    } catch (error) {
      console.error("Hubo un problema al crear la transacción:", error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Actualizar Transacción:"}>
      <InfoGroup label={"Transferido de:"}>
        <select
          name="from"
          onChange={handlePropertyChange}
          value={updateITransaction.from}
        >
          <option value="">Seleccione</option>
          {dataWallet
            .filter((w) => w.walletID + "" !== updateITransaction.destination)
            .map((w) => (
              <option key={w.walletID} value={w.walletID}>
                {w.walletName}
              </option>
            ))}
        </select>
      </InfoGroup>
      <InfoGroup label={"Transferido a:"}>
        <select
          name="destination"
          onChange={handlePropertyChange}
          value={updateITransaction.destination}
        >
          <option value="">Seleccione</option>
          {dataWallet
            .filter((w) => w.walletID + "" !== updateITransaction.from)
            .map((w) => (
              <option key={w.walletID} value={w.walletID}>
                {w.walletName}
              </option>
            ))}
        </select>
      </InfoGroup>
      <InfoGroup label={"Cantidad:"}>
        <input
          name="transactionAmount"
          type="number"
          onChange={handlePropertyChange}
          value={updateITransaction.transactionAmount}
        />
      </InfoGroup>
      <InfoGroup label={"Fecha:"}>
        <input
          type="date"
          name="transactionDate"
          onChange={handlePropertyChange}
          value={updateITransaction.transactionDate}
        />
      </InfoGroup>
      <InfoGroup label={"Comentarios:"}>
        <textarea
          name="transactionName"
          onChange={handlePropertyChange}
          value={updateITransaction.transactionName}
        ></textarea>
      </InfoGroup>
      <div className="button-group">
        <Button text={"Confirmar"} onClick={handleUpdate} />
        <Button text={"Cancelar"} className="text-red-500" onClick={onClose} />
      </div>
    </Modal>
  );
};

UpdateTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  infoTransaction: PropTypes.object.isRequired,
};

export default UpdateTransaction;
