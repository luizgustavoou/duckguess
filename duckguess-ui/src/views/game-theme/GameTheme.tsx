import { useEffect, useState } from "react";
import Game from "../game/Game";
import "./GameTheme.css";
import { ITheme } from "../../entities/ITheme";
import { themeService } from "../../services";
import AppButton from "../../components/form/AppButton";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getRandomGameGuess } from "../../slices/game-slice";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";

function GameTheme() {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();

  const [themes, setThemes] = useState<ITheme[]>();

  useEffect(() => {
    const getAllThemes = async () => {
      const res = await themeService.getAllThemes();

      setThemes(res);
    };

    getAllThemes();
  }, []);

  const loadGame = async (theme: ITheme) => {
    await dispatch(getRandomGameGuess({ themeId: theme.id }));

    navigate(RoutesPath.SELECT_PLAYERS);
  };

  return (
    <Game>
      <div className="game-theme">
        <h1 className="title">Escolha o tema</h1>
        <p className="description">
          As adivinhações e dicas da partida baseará-se no tema escolhido.
        </p>
        <div className="themes">
          {themes?.map((theme) => (
            <AppButton
              onClick={(e) => loadGame(theme)}
              type="button"
              content={theme.value}
              key={theme.id}
            ></AppButton>
          ))}
        </div>
      </div>
    </Game>
  );
}

export default GameTheme;
