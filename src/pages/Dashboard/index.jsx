import Button from "../../images/+.png";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo.png";
import { DashboardContainer } from "./style";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import AddModal from "../../modals/addModal";
import { TechContext } from "../../contexts/TechContext";
import EditModal from "../../modals/editModal";

const Dashboard = () => {
  const { handleLogout, user, techs } = useContext(UserContext);

  const {
    addModal,
    setAddModal,
    editModal,
    setEditModal,
    setTechId,
    setTechName,
  } = useContext(TechContext);

  const eventModal = (tech) => {
    setTechName(tech.title);
    setTechId(tech.id);
    setEditModal(true);
  };

  return (
    <>
      {user && (
        <>
          <DashboardContainer>
            <div className="container">
              <div className="flexGrid">
                <div className="flexLogo">
                  <header className="logoContainer">
                    <img alt="Logo" src={Logo}></img>
                    <Link onClick={() => handleLogout()} to="/">
                      Sair
                    </Link>
                  </header>
                </div>
                <div className="line"></div>
                <div className="flexPresentation">
                  <div className="presentationContainer">
                    <h3>Olá, {user.name}</h3>
                    <p>{user.course_module}</p>
                  </div>
                </div>
                <div className="line"></div>
                <div className="developContainer">
                  <div className="tecsHeader">
                    <h4>Tecnologias</h4>
                    <button onClick={() => setAddModal(true)}>
                      <img alt="addButton" src={Button}></img>
                    </button>
                  </div>
                  <ul>
                    {techs.length !== 0 ? (
                      techs.map((tech) => {
                        return (
                          <li key={tech.id} onClick={() => eventModal(tech)}>
                            <div>
                              <h4>{tech.title}</h4>
                              <p>{tech.status}</p>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <h4>Nenhuma tecnologia criada! Adicione clicando no +</h4>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </DashboardContainer>
          {addModal && <AddModal />}
          {editModal && <EditModal />}
        </>
      )}
    </>
  );
};

export default Dashboard;
