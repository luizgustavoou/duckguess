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
    if (choose === "playerOne") return playerOne;
    return playerTwo;
  }, [choose]);

  useEffect(() => {
    const gameFinished = guesses.reduce((prev, curr) => prev && curr.opened, true);
    gameFinished && navigate(RoutesPath.GAME_RESULT);
  }, []);

  return (
    <Game>
      <div className="flex flex-col items-center gap-10 w-full px-8 py-10">
        <div className="text-center space-y-1">
          <p className="text-white/50 text-sm uppercase tracking-widest">É a vez de</p>
          <h2 className="text-3xl font-bold text-amber-400">{player.name}</h2>
          <p className="text-white/40 text-sm">Escolha um envelope</p>
        </div>

        <ul className="grid grid-cols-4 gap-4 list-none">
          {guesses &&
            guesses.map((guess) => (
              <li key={guess.id} className="w-16 h-16">
                {!guess.opened && <Card guess={guess} handleClick={handleClick} />}
                {guess.opened && <CardOpened />}
              </li>
            ))}
        </ul>
      </div>
    </Game>
  );
}
