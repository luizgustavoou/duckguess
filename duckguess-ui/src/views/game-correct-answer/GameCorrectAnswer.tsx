import "./GameCorrectAnswer.css";
import patoFeliz from "../../assets/pato-festero.png"
import Game from "../game/Game";
import AppButton from "../../components/form/AppButton";
import { RoutesPath } from "../../utils/routes-path";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { resetGuess } from "../../slices/game-slice";

function GameCorrectAnswer() {
  
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <Game>
        <div className="body">
          <h1>Resposta correta, parabéns!!!</h1>
          <img
            className="img"
            alt="PatoFestero"
            src={patoFeliz}
          />
          
          <AppButton
            content={"Tela de perguntas"}
            type={"submit"}
            onClick={(e) => {
              navigate(RoutesPath.GAME_CHOOSE);
              dispatch(resetGuess());
            }}
          />

        </div>
      </Game>
    </>
  );
}

export default GameCorrectAnswer;
