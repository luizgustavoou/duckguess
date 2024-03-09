import "./GameWrongAnswer.css";
import Game from "../game/Game";
import { MouseEvent } from "react";
import patoDecepcionado from "../../assets/duck-disappointed.png";
import AppButton from "../../components/form/AppButton";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "../../utils/routes-path";
import { useAppSelector } from "../../hooks/useAppSelector";
import { resetGuess, selectGame } from "../../slices/game-slice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function GameWrongAnswer() {
  const navgate = useNavigate();
  const { guess } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    navgate(RoutesPath.GAME_CHOOSE);
    dispatch(resetGuess());
  };

  return (
    <>
      <Game>
        <div className="game-wrong-answer">
          <h1>Que pena, ninguém acertou!</h1>
          <h2>
            A resposta correta era{" "}
            <span className="answer">{guess?.answer}</span>
          </h2>
          <img className="img" alt="PatoDecepcionado" src={patoDecepcionado} />
          <AppButton
            content={"Tela de perguntas"}
            type={"submit"}
            onClick={handleClick}
          />
        </div>
      </Game>
    </>
  );
}
