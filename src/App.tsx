import { ToastContainer } from "react-toastify";
import "./App.css";
import { AppRouter } from "./components/router/App.router";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
