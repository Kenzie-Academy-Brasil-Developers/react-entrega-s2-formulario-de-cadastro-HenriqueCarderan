import Logo from "../../images/Logo.png";
import { Link } from "react-router-dom";
import { LoginContainer } from "./style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { loginSchema } from "../../validators/loginUser";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Login = ({ setUser }) => {
  const [Loading, setLoading] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmitLogin = (data) => {
    api
      .post("/sessions", data)
      .then((res) => {
        window.localStorage.clear();
        window.localStorage.setItem("@TOKEN", res.data.token);
        window.localStorage.setItem("@USERID", res.data.user.id);
        setUser(res.data.user);
        setLoading(true);
        history.push("/users/res.data.user.id");
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <LoginContainer>
      <div className="container">
        <div className="flexGrid">
          <div className="logo">
            <img alt="logo" src={Logo}></img>
          </div>
          <div className="formContainer">
            <h3>Login</h3>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <label className="label">Email</label>
              <input
                placeholder="Digite seu email aqui"
                {...register("email")}
              />
              <span>{errors.email?.message}</span>
              <label className="label">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha aqui"
                {...register("password")}
              />
              <span>{errors.password?.message}</span>
              <button type="submit">Entrar</button>
              <p>Ainda não possui uma conta?</p>
              <Link to="/register">Cadastre-se</Link>
            </form>
          </div>
        </div>
      </div>
    </LoginContainer>
  );
};

export default Login;
