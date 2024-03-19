import "./GameCorrectAnswer.css";
import { MouseEvent } from "react";
import patoFeliz from "../../assets/pato-festero.png";
import Game from "../game/Game";
import AppButton from "../../components/form/AppButton";
import { RoutesPath } from "../../utils/routes-path";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { resetGuess } from "../../slices/game-slice";

export default function GameCorrectAnswer() {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    navigate(RoutesPath.GAME_CHOOSE);
    dispatch(resetGuess());
  };

  return (
    <>
      <Game>
        <div className="game-correct-answer">
          <h1>Resposta correta, parabéns!!!</h1>
          <img className="img" alt="PatoFestero" src={patoFeliz} />

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
