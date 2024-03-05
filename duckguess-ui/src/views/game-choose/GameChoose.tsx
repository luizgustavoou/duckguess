import "./GameChoose.css";

import Card from "../../components/Card";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectGame, selectGuess } from "../../slices/game-slice";
import Game from "../game/Game";

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
      <div className="game-choose">
        <ul className="list">
          {guesses &&
            guesses.map((guess) => (
              <li className="guess" key={guess.id}>
                <Card guess={guess} handleClick={handleClick} />
              </li>
            ))}
        </ul>
      </div>
    </Game>
  );
}

export default GameChoose;
