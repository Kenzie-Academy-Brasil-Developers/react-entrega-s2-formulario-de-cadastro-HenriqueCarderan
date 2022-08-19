/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useHistory } from "react-router-dom";
import { ToastContext } from "./ToastContext";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [techs, setTechs] = useState();
  const history = useHistory();
  const { addToast } = useContext(ToastContext);

  useEffect(() => {
    if (window.localStorage.getItem("@TOKEN")) {
      api
        .get("/profile", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("@TOKEN")}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setTechs(res.data.techs);
          history.push("/users/dashboard");
        })
        .catch((err) => {
          window.localStorage.clear();
          history.push("/");
        });
    }
  }, []);

  const onSubmitLogin = (data) => {
    api
      .post("/sessions", data)
      .then((res) => {
        window.localStorage.clear();
        window.localStorage.setItem("@TOKEN", res.data.token);
        window.localStorage.setItem("@USERID", res.data.user.id);
        setUser(res.data.user);
        setTechs(res.data.user.techs);
        addToast({
          type: "success",
          title: "Login realizado com sucesso",
          description: "Você será direcionado para dashboard",
        });
        history.push("/users/dashboard");
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Email ou senha incorretos",
        });
        console.log(err);
      });
  };

  const onSubmitRegister = (data) => {
    delete data.confirmPassword;
    api
      .post("/users", data)
      .then(() => {
        addToast({
          type: "success",
          title: "Cadastro realizado com sucesso",
          description: "Você será direcionado para área de login",
        });
        history.push("/");
      })
      .catch((err) =>
        addToast({
          type: "error",
          title: "Email já cadastrado",
        })
      );
  };

  const handleLogout = () => {
    window.localStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{
        onSubmitLogin,
        user,
        setUser,
        onSubmitRegister,
        handleLogout,
        techs,
        setTechs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
