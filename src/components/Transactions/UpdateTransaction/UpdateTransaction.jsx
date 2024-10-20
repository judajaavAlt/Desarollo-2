import PropTypes from "prop-types";
import Modal from "../../generics/Modal/Modal";
import Button from "../../generics/Button/Button";
import InfoGroup from "../../generics/InfoGroup/InfoGroup";
import "./UpdateTransaction.css"

const formatDate = (date) => {
  const [month, day, year] = date.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// Ejemplo de uso:

const UpdateTransaction = ({ isOpen, onClose }) => {

  const defaultDate = formatDate("10/19/2024");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Actualizar Transacción:"}>
      <InfoGroup label={"Transferido de:"}>
        <select defaultValue={"Efectivo"}>
          <option value="Efectivo">Efectivo</option>
          <option value="Bancolombia">Bancolombia</option>
          <option value="Nequi">Nequi</option>
        </select>
      </InfoGroup>
      <InfoGroup label={"Transferido a:"}>
        <select defaultValue={"Bancolombia"}>
          <option value="Efectivo">Efectivo</option>
          <option value="Bancolombia">Bancolombia</option>
          <option value="Nequi">Nequi</option>
        </select>
      </InfoGroup>
      <InfoGroup label={"Cantidad:"}>
        <input type="number" defaultValue={1000} />
      </InfoGroup>
      <InfoGroup label={"Fecha:"}>
        <input type="date" defaultValue={defaultDate} />
      </InfoGroup>
      <InfoGroup label={"Comentarios:"}>
        <textarea
          className="info-comments"
          defaultValue={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          }
        ></textarea>
      </InfoGroup>
      <div className="button-group">
        <Button text={"Confirmar"}/>
        <Button text={"Cancelar"} className={"button-create-cancel"}/>
      </div>
    </Modal>
  );
};

UpdateTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateTransaction;
