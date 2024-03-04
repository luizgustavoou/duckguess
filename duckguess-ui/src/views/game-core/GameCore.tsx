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
      <>
        <p className="player">
          <li>{playerOne.name}</li>
          <li>{playerOne.score}</li>
        </p>
        <p className="player">
          <li>{playerTwo.name}</li>
          <li>{playerTwo.score}</li>
        </p>
        <p className="link"><SlActionRedo /> Pular a vez</p>
      </>
    </Game>
  );
}
