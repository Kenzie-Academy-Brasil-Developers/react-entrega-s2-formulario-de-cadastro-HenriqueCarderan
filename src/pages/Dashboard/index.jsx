import { Link } from "react-router-dom";
import Logo from "../../images/Logo.png";
import { DashboardContainer } from "./style";

const Dashboard = ({ user }) => {
  const handleLogout = () => {
    window.localStorage.clear();
  };
  return (
    <DashboardContainer>
      <div className="container">
        <div className="flexGrid">
          <header className="logoContainer">
            <img alt="Logo" src={Logo}></img>
            <Link onClick={() => handleLogout()} to="/">
              Sair
            </Link>
          </header>
          <div className="presentationContainer">
            <h3>Olá, {user.name}</h3>
            <p>{user.course_module}</p>
          </div>
          <div className="developContainer">
            <h4>Que pena, estamos em desenvolvimento :(</h4>
            <p>
              Nossa aplicação está em desenvolvimento, em breve teremos
              novidades
            </p>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
