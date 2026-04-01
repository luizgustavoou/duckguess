import duckWiner from "../../assets/duck-winer.png";
import duckCute from "../../assets/duck-cute.png";
import { useAppSelector } from "../../hooks/useAppSelector";
import { resetGame, selectGame } from "../../slices/game-slice";
import { useEffect, useState } from "react";
import Game from "../game/Game";
import AppButton from "../../components/form/AppButton";
import { RoutesPath } from "../../utils/routes-path";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function GameResult() {
  const { playerOne, playerTwo } = useAppSelector(selectGame);
  const [winer, setWiner] = useState("");
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate(RoutesPath.HOME);
    dispatch(resetGame());
  };

  const result = () => {
    if (playerOne.score > playerTwo.score) setWiner(playerOne.name);
    else if (playerOne.score < playerTwo.score) setWiner(playerTwo.name);
  };

  useEffect(() => {
    result();
  }, []);

  const isDraw = winer === "";

  return (
    <>
      <Game>
        <div className="flex flex-col items-center gap-6 w-full px-8 py-10">
          <div className="text-center space-y-3">
            <div className="text-5xl">{isDraw ? "🤝" : "🏆"}</div>
            <h1 className="text-3xl font-bold text-gradient">
              {isDraw ? "Empate!" : `Parabéns, ${winer}!`}
            </h1>
            <p className="text-white/50 text-sm">
              {isDraw ? "Nenhum jogador levou a melhor." : "Você é o grande vencedor!"}
            </p>
          </div>

          {/* Scores */}
          <div className="flex gap-6 w-full max-w-xs justify-center">
            <div className="flex-1 rounded-2xl p-3 text-center bg-gradient-to-br from-rose-700 to-rose-500 shadow-lg">
              <p className="text-xs text-white/70 uppercase tracking-wider">{playerOne.name}</p>
              <p className="text-2xl font-bold text-white">{playerOne.score}</p>
            </div>
            <div className="flex-1 rounded-2xl p-3 text-center bg-gradient-to-br from-indigo-700 to-indigo-500 shadow-lg">
              <p className="text-xs text-white/70 uppercase tracking-wider">{playerTwo.name}</p>
              <p className="text-2xl font-bold text-white">{playerTwo.score}</p>
            </div>
          </div>

          <img
            className="w-44 drop-shadow-xl animate-float"
            alt={isDraw ? "PatoFofo" : "PatoVencedor"}
            src={isDraw ? duckCute : duckWiner}
          />
          <AppButton content="🏠  Início" type="submit" onClick={handleClick} />
        </div>
      </Game>
    </>
  );
}
