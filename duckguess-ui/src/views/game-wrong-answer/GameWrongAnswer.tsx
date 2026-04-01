import Game from "../game/Game";
import patoDecepcionado from "../../assets/duck-disappointed.png";
import AppButton from "../../components/form/AppButton";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "../../utils/routes-path";
import { useAppSelector } from "../../hooks/useAppSelector";
import { resetGuess, selectGame } from "../../slices/game-slice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function GameWrongAnswer() {
  const navgate = useNavigate();
  const { guess } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navgate(RoutesPath.GAME_CHOOSE);
    dispatch(resetGuess());
  };

  return (
    <>
      <Game>
        <div className="flex flex-col items-center gap-6 w-full px-8 py-10">
          <div className="text-center space-y-2">
            <div className="text-5xl">😔</div>
            <h1 className="text-3xl font-bold text-rose-400">Que pena, ninguém acertou!</h1>
            <h2 className="text-white/70 text-lg">
              A resposta era:{" "}
              <span className="text-amber-400 font-bold underline uppercase tracking-wide">
                {guess?.answer}
              </span>
            </h2>
          </div>
          <img
            className="w-44 drop-shadow-xl animate-float"
            alt="PatoDecepcionado"
            src={patoDecepcionado}
          />
          <AppButton content="Próxima Pergunta →" type="submit" onClick={handleClick} variant="danger" />
        </div>
      </Game>
    </>
  );
}
