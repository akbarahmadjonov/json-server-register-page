import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { useContext } from "react";
import { Private } from "./apps/Private";
import { Public } from "./apps/Public";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Private />;
  }
  return <Public />;
}

export default App;
