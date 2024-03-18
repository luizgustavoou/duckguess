import { useEffect, useState } from "react";
import Game from "../game/Game";
import "./GameTheme.css";
import { ITheme } from "../../entities/ITheme";
import { themeService } from "../../services";
import AppButton from "../../components/form/AppButton";

function GameTheme() {
  const [themes, setThemes] = useState<ITheme[]>();

  useEffect(() => {
    const getAllThemes = async () => {
      const res = await themeService.getAllThemes();

      setThemes(res);
    };

    getAllThemes();
  }, []);

  return (
    <Game>
      <div className="game-theme">
        <h1 className="title">Escolha o tema</h1>
        <p className="description">
          As adivinhações e dicas da partida baseará-se no tema escolhido.
        </p>
        <ul className="themes">
          {themes?.map((theme) => (
            <AppButton type="button" content={theme.value}></AppButton>
          ))}
        </ul>
      </div>
    </Game>
  );
}

export default GameTheme;
