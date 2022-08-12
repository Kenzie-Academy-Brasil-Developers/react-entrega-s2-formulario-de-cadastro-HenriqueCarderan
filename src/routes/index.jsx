import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import { useState } from "react";

const RoutesMain = () => {
  const [user, setUser] = useState({});

  return (
    <Switch>
      <Route exact path="/">
        <Login setUser={setUser} />
      </Route>
      <Route exact path="/register">
        <Register></Register>
      </Route>
      <Route exact path="/users/:user_id">
        <Dashboard user={user}></Dashboard>
      </Route>
    </Switch>
  );
};

export default RoutesMain;
