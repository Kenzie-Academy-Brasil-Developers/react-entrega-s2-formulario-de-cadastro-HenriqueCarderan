import "./App.css";
import ToastContainer from "./components/ToastContainer";
import RoutesMain from "./routes";
import Global from "./styles/global";

function App() {
  return (
    <div>
      <Global />
      <RoutesMain />
      <ToastContainer />
    </div>
  );
}

export default App;
