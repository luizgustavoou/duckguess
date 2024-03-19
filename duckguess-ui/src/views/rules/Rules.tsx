import AppButton from "../../components/form/AppButton";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";
import Game from "../game/Game";
import "./Rules.css";
import { MouseEvent } from "react";
import DuckRuler from "../../assets/duck-ruler.webp"

export default function Rules() {
  const navigate = useAppNavigate();

  const handleClick = (
    _: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    navigate(RoutesPath.HOME);
  };

  return (
    <Game>
      <div className="rules">
        <p>
          Inspirado no popular programa da TV, no <span>jogo das três pistas </span>
          você precisa descobrir a palavra secreta usando até <span>três pistas </span>
          como dica.Quanto menos pistas você revelar para descobrir a palavra, <span>
          mais pontos irá marcar</span>.
        </p>
        <img className="img" alt="duck-ruler" src={DuckRuler} />
        <AppButton type="button" content="Voltar" onClick={handleClick} />
      </div>
    </Game>
  );
}
