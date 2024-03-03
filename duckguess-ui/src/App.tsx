import "./App.css";
import { LayoutMain } from "./components/LayoutMain";
import SelectPlayers from "./components/SelectPlayers";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./views/home/Home";
import { RoutesPath } from "./utils/routes-path";

export default function App() {
  return (
    <Router>
      <LayoutMain
        header={<></>}
        main={
          <Routes>
            <Route
              path={RoutesPath.ROOT}
              element={<Navigate to={RoutesPath.HOME} />}
            />
            <Route path={RoutesPath.HOME} element={<Home />} />
            <Route
              path={RoutesPath.SELECT_PLAYERS}
              element={<SelectPlayers />}
            />
            <Route
              path={RoutesPath.WILDCARD}
              element={<Navigate to={RoutesPath.HOME} />}
            />
          </Routes>
        }
        footer={<></>}
      />
    </Router>
  );
}
