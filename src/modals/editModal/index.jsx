import { useForm } from "react-hook-form";
import { techEditSchema } from "../../validators/techEdit";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { TechContext } from "../../contexts/TechContext";
import { ContainerEditModal } from "../editModal/style";
import { useOutsiedeClick } from "../../hooks/useOutsideClick.js";

const EditModal = () => {
  const { setEditModal, onSubmitEdit, deleteTech, techName } =
    useContext(TechContext);

  const modalRef = useOutsiedeClick(() => {
    setEditModal(false);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(techEditSchema),
  });

  return (
    <ContainerEditModal>
      <div className="content" ref={modalRef}>
        <div className="headerContainer">
          <h2>Tecnologia Detalhes</h2>
          <button onClick={() => setEditModal(false)}>X</button>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit(onSubmitEdit)}>
            <label>Nome da Tecnologia</label>
            <input disabled placeholder={techName}></input>
            <label>Status</label>
            <select {...register("status")}>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
            <span>{errors.status?.message}</span>
            <div className="buttonContainer">
              <button className="editButton" type="submit">
                Salvar alterarações
              </button>
              <button
                type="button"
                className="removeButton"
                onClick={() => deleteTech()}
              >
                Excluir
              </button>
            </div>
          </form>
        </div>
      </div>
    </ContainerEditModal>
  );
};

export default EditModal;
