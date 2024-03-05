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
      </div>
    </Game>
  );
}
