/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useHistory } from "react-router-dom";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [techs, setTechs] = useState();

  const history = useHistory();

  useEffect(() => {
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
        console.log(err);
        window.localStorage.clear();
        history.push("/");
      });
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
        setLoading(true);
        history.push("/users/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const onSubmitRegister = (data) => {
    delete data.confirmPassword;
    api
      .post("/users", data)
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    window.localStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{
        Loading,
        setLoading,
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
