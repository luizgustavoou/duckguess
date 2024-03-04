import { ImEnvelop } from "react-icons/im";
import Card from "../../components/Card";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectGame, selectGuess } from "../../slices/game-slice";
import Game from "../game/Game";
import "./GameChoose.css";

import { useNavigate } from "react-router-dom";
import { IGuess } from "../../entities/IGuess";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RoutesPath } from "../../utils/routes-path";

function GameChoose() {
  const { guesses } = useAppSelector(selectGame);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(guesses);

  const handleClick = (guess: IGuess) => {
    dispatch(selectGuess(guess));
    navigate(RoutesPath.GAME_CORE);
  };

  return (
    <Game>
      <>
        <ul className="list">
          {guesses &&
            guesses.map((guess) => (
              <li className="element">
                <Card guess={guess} handleClick={handleClick} />
              </li>
            ))}
        </ul>
      </>
    </Game>
  );
}

export default GameChoose;
