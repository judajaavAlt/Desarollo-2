import PropTypes from "prop-types";
import Modal from "../../generics/Modal/Modal";
import Button from "../../generics/Button/Button";
import InfoGroup from "../../generics/InfoGroup/InfoGroup";
import "./UpdateTransaction.css"
import { useState, useEffect } from "react";
import { readWallet } from "../../../helpers/portWallets";
import { updateTransaction } from "../../../helpers/portTransaccion";

// Ejemplo de uso:

const UpdateTransaction = ({ isOpen, onClose, infoTransaction }) => {
  console.log(infoTransaction)
  const [cat, setCat] = useState(infoTransaction);

  const [dataWallet, setDataWallet] = useState([]);

  useEffect(() => {
    const traer = async () => {
      try {
        const obtener = await readWallet(1);
        setDataWallet(obtener);
      } catch (e) {
        console.error("Error al cargar categorías:", e);
      }
    };
    traer();
  }, []);

  const handleNameChange = (event) => {
    const newValue = event.target.value;
    const nameProp = event.target.name;
    setCat((prevState) => ({
      ...prevState,
      [nameProp]: newValue,
    }));
    console.log(cat);
  };

  const llamoo = async () => {
    try {
      await updateTransaction(
        cat.transactionID,
        cat.transactionDate,
        cat.transactionName,
        cat.transactionAmount,
        cat.destination,
        cat.from
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
      <select name="from" onChange={handleNameChange} value={cat.from}>
          <option value="">Seleccione</option>
          {dataWallet
            .filter((w) => w.walletID + "" !== cat.destination) // Filtrar la opción seleccionada en "destination"
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
          onChange={handleNameChange}
          value={cat.destination}
        >
          <option value="">Seleccione</option>
          {dataWallet
            .filter((w) => w.walletID + "" !== cat.from) // Filtrar la opción seleccionada en "from"
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
          onChange={handleNameChange}
          value={cat.transactionAmount}
        />
      </InfoGroup>
      <InfoGroup label={"Fecha:"}>
      <input
          type="date"
          name="transactionDate"
          onChange={handleNameChange}
          value={cat.transactionDate}
        />
      </InfoGroup>
      <InfoGroup label={"Comentarios:"}>
      <textarea
          name="transactionName"
          onChange={handleNameChange}
          value={cat.transactionName}
        ></textarea>
      </InfoGroup>
      <div className="button-group">
        <Button text={"Confirmar"} onClick={llamoo}/>
        <Button text={"Cancelar"} className={"button-create-cancel"} onClick={onClose}/>
      </div>
    </Modal>
  );
};

UpdateTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateTransaction;
