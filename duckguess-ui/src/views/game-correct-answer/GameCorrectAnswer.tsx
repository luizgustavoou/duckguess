import patoFeliz from "../../assets/pato-festero.png";
import Game from "../game/Game";
import AppButton from "../../components/form/AppButton";
import { RoutesPath } from "../../utils/routes-path";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { resetGuess } from "../../slices/game-slice";

export default function GameCorrectAnswer() {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate(RoutesPath.GAME_CHOOSE);
    dispatch(resetGuess());
  };

  return (
    <>
      <Game>
        <div className="flex flex-col items-center gap-6 w-full px-8 py-10">
          <div className="text-center space-y-2">
            <div className="text-5xl">🎉</div>
            <h1 className="text-3xl font-bold text-emerald-400">Resposta Correta!</h1>
            <p className="text-white/50 text-sm">Parabéns, continue assim!</p>
          </div>
          <img
            className="w-52 drop-shadow-xl animate-float"
            alt="PatoFestero"
            src={patoFeliz}
          />
          <AppButton content="Próxima Pergunta →" type="submit" onClick={handleClick} />
        </div>
      </Game>
    </>
  );
}
