import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validators/registerUser";

import { RegisterContainer } from "./style";
import Logo from "../../images/Logo.png";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Register = () => {
  const { onSubmitRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  return (
    <RegisterContainer>
      <div className="container">
        <div className="flexGrid">
          <div className="logoContainer">
            <img alt="logo" src={Logo}></img>
            <Link to="/">Voltar</Link>
          </div>
          <div className="formContainer">
            <h3>Crie sua conta</h3>
            <p>Rápido e grátis, vamos nessa</p>
            <form onSubmit={handleSubmit(onSubmitRegister)}>
              <label>Nome</label>
              <input placeholder="Digite seu nome aqui" {...register("name")} />
              <span>{errors.name?.message}</span>
              <label>Email</label>
              <input
                placeholder="Digite seu email aqui"
                {...register("email")}
              />
              <span>{errors.email?.message}</span>
              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite aqui sua senha"
                {...register("password")}
              />
              <span>{errors.password?.message}</span>
              <label>Confirmar senha</label>
              <input
                type="password"
                placeholder="Confirme sua senha"
                {...register("confirmPassword")}
              />
              <span>{errors.confirmPassword?.message}</span>
              <label>Bio</label>
              <input placeholder="Fale sobre você" {...register("bio")} />
              <span>{errors.bio?.message}</span>
              <label>Contato</label>
              <input placeholder="Opçõe de contato" {...register("contact")} />
              <span>{errors.contact?.message}</span>
              <label>Selecionar módulo</label>
              <select {...register("course_module")}>
                <option></option>
                <option value="Primeiro módulo (Introdução ao Frontend)">
                  "Primeiro módulo (Introdução ao Frontend)"
                </option>
                <option value="Segundo módulo (Frontend Avançado)">
                  Segundo módulo (Frontend Avançado)
                </option>
                <option value="Terceiro módulo (Introdução ao Backend)">
                  Terceiro módulo (Introdução ao Backend)
                </option>
                <option value="Quarto módulo (Backend Avançado)">
                  Quarto módulo (Backend Avançado)
                </option>
              </select>
              <span>{errors.course_module?.message}</span>
              <button type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </RegisterContainer>
  );
};

export default Register;
