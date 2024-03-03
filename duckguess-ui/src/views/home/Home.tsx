import "./Home.css";
import logo from "../../assets/duck-sing-removebg-preview.png";
import AppButton from "../../components/form/AppButton";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "../../utils/routes-path";

import { MouseEvent } from "react";

export default function Home() {
  const naviate = useNavigate();

  const handlePlayClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    naviate(RoutesPath.SELECT_PLAYERS);
  };

  const handleRulesClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    naviate(RoutesPath.RULES);
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
