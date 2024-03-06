import Hint from "../../components/Hint";
import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectGame } from "../../slices/game-slice";
import Game from "../game/Game";
import "./GameCore.css";
import { SlActionRedo } from "react-icons/sl";

export default function GameCore() {
  const { guess, playerOne, playerTwo } = useAppSelector(selectGame);

  console.log(guess);
  return (
    <Game>
      <div className="game-core">
        <div className="info">
          <div className="players">
            <div className="player">
              <p>{playerOne.name}</p>
              <p>{playerOne.score}</p>
            </div>
            <div className="player">
              <p>{playerTwo.name}</p>
              <p>{playerTwo.score}</p>
            </div>
          </div>

          <div className="actions">
            <SlActionRedo /> Pular a vez
          </div>
        </div>

        <div className="body">
          {guess?.hints &&
            guess.hints.map((hint) => (
              <>
                <Hint hint={hint} numberPoints={10} />
              </>
            ))}
        </div>

        <div className="answer">
          <h1>Agora é a vez de </h1>
          <AppInput type="text" placeholder="Digite a resposta" />
          <AppButton content={"Enviar"} type={"button"} />
        </div>
      </div>
    </Game>
  );
}
