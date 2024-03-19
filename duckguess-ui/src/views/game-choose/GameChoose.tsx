import "./GameChoose.css";

import Card from "../../components/Card";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  selectGame,
  selectGuess,
  setChoose,
  setGuessOpened,
  setPlayerTurn,
} from "../../slices/game-slice";
import Game from "../game/Game";

import { useNavigate } from "react-router-dom";
import { IGuess } from "../../entities/IGuess";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RoutesPath } from "../../utils/routes-path";
import { useEffect, useMemo } from "react";
import CardOpened from "../../components/CardOpened";

export default function GameChoose() {
  const { guesses, choose, playerOne, playerTwo } = useAppSelector(selectGame);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (guess: IGuess) => {
    dispatch(selectGuess(guess));
    dispatch(setGuessOpened(guess.id));
    navigate(RoutesPath.GAME_CORE);

    nextPlayer();
  };

  const nextPlayer = () => {
    if (choose === "playerOne") {
      dispatch(setChoose("playerTwo"));
      dispatch(setPlayerTurn("playerOne"));
      return;
    }

    dispatch(setChoose("playerOne"));
    dispatch(setPlayerTurn("playerTwo"));
  };

  const player = useMemo(() => {
    if (choose === "playerOne") {
      return playerOne;
    }

    return playerTwo;
  }, [choose]);

  useEffect(() => {
    const gameFinished = guesses.reduce((prev, curr) => {
      return prev && curr.opened;
    }, true);

    gameFinished && navigate(RoutesPath.GAME_RESULT);
  }, []);

  return (
    <Game>
      <div className="game-choose">
        <p>{player.name} ESCOLHE UM ENVELOPE</p>
        <ul className="list">
          {guesses &&
            guesses.map((guess) => (
              <li className="guess" key={guess.id}>
                {!guess.opened && (
                  <Card guess={guess} handleClick={handleClick} />
                )}
                {guess.opened && <CardOpened />}
              </li>
            ))}
        </ul>
      </div>
    </Game>
  );
}
