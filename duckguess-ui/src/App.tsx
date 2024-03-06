import "./App.css";
import { LayoutMain } from "./components/LayoutMain";
import SelectPlayers from "./views/select-players/SelectPlayers";
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
import { useAppSelector } from "./hooks/useAppSelector";
import { selectGame } from "./slices/game-slice";

export default function App() {
  const { status } = useAppSelector(selectGame);

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
            <Route
              path={RoutesPath.GAME_CHOOSE}
              element={
                status === "playing" ? (
                  <GameChoose />
                ) : (
                  <Navigate to={RoutesPath.HOME} />
                )
              }
            />
            <Route
              path={RoutesPath.GAME_CORE}
              element={
                status === "playing" ? (
                  <GameCore />
                ) : (
                  <Navigate to={RoutesPath.HOME} />
                )
              }
            />
            <Route
              path={RoutesPath.GAME_CORRECT_ANSWER}
              element={
                status === "playing" ? (
                  <GameCorrectAnswer />
                ) : (
                  <Navigate to={RoutesPath.HOME} />
                )
              }
            />
            <Route
              path={RoutesPath.GAME_RESULT}
              element={
                status === "playing" ? (
                  <GameResult />
                ) : (
                  <Navigate to={RoutesPath.HOME} />
                )
              }
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
