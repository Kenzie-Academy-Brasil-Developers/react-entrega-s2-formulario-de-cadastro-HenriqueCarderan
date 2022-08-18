import { createContext, useContext, useState } from "react";
import api from "../services/api";
import { UserContext } from "./UserContext";

export const TechContext = createContext({});

function TechProvider({ children }) {
  const { techs, setTechs } = useContext(UserContext);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [techId, setTechId] = useState("");
  const [techName, setTechName] = useState("");
  const [techStatus, setTechStatus] = useState("");

  const onSubmitTech = (data) => {
    api
      .post("/users/techs", data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("@TOKEN")}`,
        },
      })
      .then((res) => {
        setTechs([...techs, res.data]);
        setAddModal(false);
      })
      .catch((err) => console.log(err.response.data.message));
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
        setTechStatus,
      }}
    >
      {children}
    </TechContext.Provider>
  );
}

export default TechProvider;
