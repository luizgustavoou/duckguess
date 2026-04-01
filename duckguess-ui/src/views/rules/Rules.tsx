import AppButton from "../../components/form/AppButton";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";
import Game from "../game/Game";
import { MouseEvent } from "react";
import DuckRuler from "../../assets/duck-ruler.webp";

export default function Rules() {
  const navigate = useAppNavigate();

  const handleClick = (_: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    navigate(RoutesPath.HOME);
  };

  return (
    <Game>
      <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-8 py-10">
        <h1 className="text-3xl font-bold text-gradient">Como Jogar</h1>
        <p className="text-white/80 text-lg font-medium leading-relaxed text-center">
          Inspirado no popular programa de TV, no{" "}
          <span className="text-amber-400 font-semibold">jogo das três pistas</span> você
          precisa descobrir a palavra secreta usando até{" "}
          <span className="text-amber-400 font-semibold">três pistas</span> como dica.
          Quanto menos pistas você revelar para descobrir a palavra,{" "}
          <span className="text-emerald-400 font-semibold">mais pontos irá marcar</span>.
        </p>
        <img
          className="w-52 drop-shadow-xl animate-float"
          alt="duck-ruler"
          src={DuckRuler}
        />
        <AppButton type="button" content="← Voltar" onClick={handleClick} />
      </div>
    </Game>
  );
}
