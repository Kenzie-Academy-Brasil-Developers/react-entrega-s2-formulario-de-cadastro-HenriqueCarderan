/* eslint-disable react-hooks/exhaustive-deps */
import { ContainerAddModal } from "./style";
import { useForm } from "react-hook-form";
import { techSchema } from "../../validators/techUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { TechContext } from "../../contexts/TechContext";
import { useOutsiedeClick } from "../../hooks/useOutsideClick.js";

const AddModal = () => {
  const { onSubmitTech, setAddModal } = useContext(TechContext);

  const modalRef = useOutsiedeClick(() => {
    setAddModal(false);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(techSchema),
  });

  return (
    <ContainerAddModal>
      <div className="content" ref={modalRef}>
        <div className="headerContainer">
          <h2>Cadastrar Tecnologia</h2>
          <button onClick={() => setAddModal(false)}>X</button>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit(onSubmitTech)}>
            <label>Nome</label>
            <input placeholder="Tecnologia" {...register("title")} />
            <span>{errors.title?.message}</span>
            <label>Selecionar status</label>
            <select {...register("status")}>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
            <span>{errors.status?.message}</span>
            <button type="submit">Cadastrar Tecnologia</button>
          </form>
        </div>
      </div>
    </ContainerAddModal>
  );
};

export default AddModal;
