import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import ActualizarVuelo from "./pages/ActualizarVuelo";
import CrearVuelo from "./pages/CrearVuelo";
import RutaTable from "./pages/RutaTable";
import VuelosTable from "./pages/VuelosTable";

function App() {
  return (
    <Router>
      <Navbar></Navbar>

      <Switch>
          <Route path="/actualizarVuelo/:id">
            <ActualizarVuelo />
          </Route>
          <Route path="/crearVuelo/:id">
            <CrearVuelo />
          </Route>
          <Route path="/vuelos/:id">
            <VuelosTable />
          </Route>
          <Route path="/rutas">
            <RutaTable></RutaTable>
          </Route>
          <Route path="/" exact>
            <RutaTable></RutaTable>
          </Route>
        </Switch>

    </Router>
  );
}

export default App;
