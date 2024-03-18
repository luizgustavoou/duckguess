import "./Home.css";
import logo from "../../assets/duck-sing-removebg-preview.png";
import AppButton from "../../components/form/AppButton";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "../../utils/routes-path";

import { MouseEvent } from "react";
import { useAppNavigate } from "../../hooks/useAppNavigate";

export default function Home() {
  const navigate = useAppNavigate();

  const handlePlayClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    navigate(RoutesPath.GAME_THEME);
  };

  const handleRulesClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    navigate(RoutesPath.RULES);
  };

  return (
    <div className="home">
      <h1>Jogo das três pistas</h1>
      <div className="box">
        <img alt="PatoMarketero" src={logo} />
      </div>
      <div className="actions">
        <AppButton content="Jogar" type="button" onClick={handlePlayClick} />
        <AppButton content="Regras" type="button" onClick={handleRulesClick} />
      </div>
    </div>
  );
}
