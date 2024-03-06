import "./GameChoose.css";

import Card from "../../components/Card";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  selectGame,
  selectGuess,
  setChoose,
  setGuessOpened,
} from "../../slices/game-slice";
import Game from "../game/Game";

import { useNavigate } from "react-router-dom";
import { IGuess } from "../../entities/IGuess";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RoutesPath } from "../../utils/routes-path";
import { useMemo, useState } from "react";
import { IPlayer } from "../../entities/IPlayer";
import CardOpened from "../../components/CardOpened";

function GameChoose() {
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
      return;
    }

    dispatch(setChoose("playerOne"));
  };

  const player = useMemo(() => {
    if (choose === "playerOne") {
      return playerOne;
    }

    return playerTwo;
  }, [choose]);

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

export default GameChoose;
