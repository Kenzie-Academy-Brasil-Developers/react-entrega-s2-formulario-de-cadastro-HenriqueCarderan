import { createContext, useContext, useState } from "react";
import api from "../services/api";
import { ToastContext } from "./ToastContext";
import { UserContext } from "./UserContext";

export const TechContext = createContext({});

function TechProvider({ children }) {
  const { techs, setTechs } = useContext(UserContext);
  const { addToast } = useContext(ToastContext);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [techId, setTechId] = useState("");
  const [techName, setTechName] = useState("");

  const onSubmitTech = (data) => {
    api
      .post("/users/techs", data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("@TOKEN")}`,
        },
      })
      .then((res) => {
        setTechs([...techs, res.data]);
        addToast({
          type: "info",
          title: "Tecnologia adicionada com sucesso",
        });
        setAddModal(false);
      })
      .catch((err) =>
        addToast({
          type: "error",
          title: "Usuário já possui a tecnologia",
        })
      );
  };

  const onSubmitEdit = (data) => {
    api
      .put(`/users/techs/${techId}`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("@TOKEN")}`,
        },
      })
      .then((res) => {
        const techsEdit = techs.filter((tech) => tech.id !== techId);
        const [techEdit] = techs.filter((tech) => tech.id === techId);
        techEdit.status = res.data.status;
        setTechs([...techsEdit, techEdit]);
        addToast({
          type: "info",
          title: "Tecnologia editada com sucesso",
        });
        setEditModal(false);
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const deleteTech = () => {
    api
      .delete(`/users/techs/${techId}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("@TOKEN")}`,
        },
      })
      .then(() => {
        const techsDelete = techs.filter((tech) => tech.id !== techId);
        setTechs(techsDelete);
        addToast({
          type: "info",
          title: "Tecnologia removida com sucesso",
        });
        setEditModal(false);
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <TechContext.Provider
      value={{
        addModal,
        setAddModal,
        onSubmitTech,
        editModal,
        setEditModal,
        onSubmitEdit,
        deleteTech,
        techId,
        setTechId,
        techName,
        setTechName,
      }}
    >
      {children}
    </TechContext.Provider>
  );
}

export default TechProvider;
