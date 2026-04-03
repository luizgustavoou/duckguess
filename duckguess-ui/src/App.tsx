import React from "react";
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
import GameWrongAnswer from "./views/game-wrong-answer/GameWrongAnswer";
import GameTheme from "./views/game-theme/GameTheme";
import Login from "./views/login/Login";
import RegisterGuess from "./views/register-guess/RegisterGuess";
import { useAuth } from "./hooks/useAuth";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { validateAuth } from "./slices/auth-slice";
import { useEffect } from "react";

export default function App() {
  const { status } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();

  const { auth } = useAuth();

  useEffect(() => {
    dispatch(validateAuth());
  }, [dispatch]);

  const withLayout = (element: React.ReactNode) => (
    <LayoutMain header={<></>} main={element} footer={<></>} />
  );

  return (
    <Router>
      <Routes>
        <Route
          path={RoutesPath.ROOT}
          element={<Navigate to={RoutesPath.HOME} />}
        />
        <Route path={RoutesPath.HOME} element={withLayout(<Home />)} />
        <Route
          path={RoutesPath.LOGIN}
          element={
            !auth
              ? withLayout(<Login />)
              : <Navigate to={RoutesPath.REGISTER_GUESS} />
          }
        />
        <Route
          path={RoutesPath.REGISTER_GUESS}
          element={
            auth ? <RegisterGuess /> : <Navigate to={RoutesPath.LOGIN} />
          }
        />
        <Route
          path={RoutesPath.SELECT_PLAYERS}
          element={withLayout(<SelectPlayers />)}
        />
        <Route path={RoutesPath.RULES} element={withLayout(<Rules />)} />
        <Route path={RoutesPath.GAME_THEME} element={withLayout(<GameTheme />)} />
        <Route
          path={RoutesPath.GAME_CHOOSE}
          element={
            status === "playing" ? (
              withLayout(<GameChoose />)
            ) : (
              <Navigate to={RoutesPath.HOME} />
            )
          }
        />
        <Route
          path={RoutesPath.GAME_CORE}
          element={
            status === "playing" ? (
              withLayout(<GameCore />)
            ) : (
              <Navigate to={RoutesPath.HOME} />
            )
          }
        />
        <Route
          path={RoutesPath.GAME_CORRECT_ANSWER}
          element={
            status === "playing" ? (
              withLayout(<GameCorrectAnswer />)
            ) : (
              <Navigate to={RoutesPath.HOME} />
            )
          }
        />
        <Route
          path={RoutesPath.GAME_WRONG_ANSWER}
          element={
            status === "playing" ? (
              withLayout(<GameWrongAnswer />)
            ) : (
              <Navigate to={RoutesPath.HOME} />
            )
          }
        />
        <Route
          path={RoutesPath.GAME_RESULT}
          element={
            status === "playing" ? (
              withLayout(<GameResult />)
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
    </Router>
  );
}
