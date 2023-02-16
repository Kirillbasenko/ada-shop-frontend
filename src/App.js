import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import ButtonAppBar from "./components/mainPage/NavBar";

function App() {
  return (
    <Router>
      <ButtonAppBar/>
      <AppRouter/>
    </Router>
  );
}

export default App;
