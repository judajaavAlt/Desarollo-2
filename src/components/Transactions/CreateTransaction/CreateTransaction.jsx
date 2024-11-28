import PropTypes from "prop-types";
import Modal from "../../generics/Modal/Modal";
import InfoGroup from "../../generics/InfoGroup/InfoGroup";
import Button from "../../generics/Button/Button";
import "./CreateTransaction.css";
import { useState, useEffect } from "react";
import { createTransaction } from "../../../helpers/portTransaccion";
import { readWallet } from "../../../helpers/portWallets";

const CreateTransaction = ({ isOpen, onClose }) => {
  const [cat, setCat] = useState({
    from: "",
    destination: "",
    transactionAmount: "",
    transactionName: "",
    transactionDate: "",
  });

  // useEffect(() => {
  //   if (isCreate) {
  //     setCat({
  //       from: "",
  //       destination: "",
  //       transactionAmount: "",
  //       transactionName: "",
  //       transactionDate: "",
  //     });
  //   } else {
  //     setCat(infoTransaction);
  //   }
  //   setErrors({ name: false});
  // }, [isOpen]);

  const handleNameChange = (event) => {
    const newValue = event.target.value;
    const nameProp = event.target.name;
    setCat((prevState) => ({
      ...prevState,
      [nameProp]: newValue,
    }));
    console.log(event.target.name);
    console.log(cat);
  };

  const llamoo = async () => {
      try {
        const transactionDate = "2024-08-27"; // Fecha de ejemplo
        const transactionName = "Compra en tienda X";
        const transactionAmount = 150; // Monto de ejemplo
        const destination = 1;
        const from = 2;
    
        await createTransaction(transactionDate, transactionName, transactionAmount, destination, from);
        console.log("Transacción creada exitosamente.");
      } catch (error) {
        console.error("Hubo un problema al crear la transacción:", error.message);
      }
    ;
    // const updatedCat = {
    //   ...cat,
    //   transactionDate: new Date(cat.transactionDate).toISOString(), // Cambia al formato ISO
    // };
  
    // createTransaction(
    //   updatedCat
    // );
  
    // console.log("Datos enviados a la BD:", updatedCat);
    // createTransaction(cat)
    // console.log(cat)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear transferencia">
      <InfoGroup label="Transfiera de:">
        <select name="from" onChange={handleNameChange} value={cat.from}>
          <option value={1}>Efectivo</option>
          <option value={2}>Bancolombia</option>
          <option value={3}>Nequi</option>
        </select>
      </InfoGroup>

      <InfoGroup label="Transfiera a:">
        <select name="destination" onChange={handleNameChange} value={cat.destination}>
          <option value={1}>Efectivo</option>
          <option value={2}>Bancolombia</option>
          <option value={3}>Nequi</option>
        </select>
      </InfoGroup>

      <InfoGroup label="Cantidad:">
        <input
          name="transactionAmount"
          type="number"
          defaultValue={0}
          onChange={handleNameChange}
          value={cat.transactionAmount}
        />
      </InfoGroup>

      <InfoGroup label="Fecha:">
        <input type="date" name="transactionDate" onChange={handleNameChange} value={cat.transactionDate}/>
      </InfoGroup>

      <InfoGroup label="Comentarios:">
        <textarea name="transactionName" onChange={handleNameChange} value={cat.transactionName}></textarea>
      </InfoGroup>

      <div className="button-group">
        <Button text="Crear" className="button-create" onClick={llamoo}/>
      </div>
    </Modal>
  );
};

CreateTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateTransaction;
