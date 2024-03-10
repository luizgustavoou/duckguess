import AppButton from "../../components/form/AppButton";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";
import Game from "../game/Game";
import "./Rules.css";
import { MouseEvent } from "react";

function Rules() {
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
          Inspirado no popular programa da TV, no jogo das três pistas você
          precisa descobrir a palavra secreta usando até 3 pistas como dica.
          Quanto menos pistas você revelar para descobrir a palavra, mais pontos
          irá marcar.
        </p>
        <AppButton type="button" content="Voltar" onClick={handleClick} />
      </div>
    </Game>
  );
}

export default Rules;
