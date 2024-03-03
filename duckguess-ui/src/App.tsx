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
import Rules from "./views/rules/Rules";
import GameChoose from "./views/game-choose/GameChoose";
import GameCore from "./views/game-core/GameCore";
import GameCorrectAnswer from "./views/game-correct-answer/GameCorrectAnswer";
import GameResult from "./views/game-result/GameResult";

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
            <Route path={RoutesPath.RULES} element={<Rules />} />
            <Route path={RoutesPath.GAME_CHOOSE} element={<GameChoose />} />
            <Route path={RoutesPath.GAME_CORE} element={<GameCore />} />
            <Route
              path={RoutesPath.GAME_CORRECT_ANSWER}
              element={<GameCorrectAnswer />}
            />
            <Route path={RoutesPath.GAME_RESULT} element={<GameResult />} />
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
