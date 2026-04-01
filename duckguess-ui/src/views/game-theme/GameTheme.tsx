import { useEffect, useState } from "react";
import Game from "../game/Game";
import { ITheme } from "../../entities/ITheme";
import { themeService } from "../../services";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getRandomGameGuess } from "../../slices/game-slice";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";

export default function GameTheme() {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();

  const [themes, setThemes] = useState<ITheme[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllThemes = async () => {
      const res = await themeService.getAllThemes();
      setThemes(res);
    };
    getAllThemes();
  }, []);

  const loadGame = async (theme: ITheme) => {
    setLoading(true);
    await dispatch(getRandomGameGuess({ themeId: theme.id }));
    navigate(RoutesPath.SELECT_PLAYERS);
    setLoading(false);
  };

  return (
    <Game>
      <div className="flex flex-col items-center gap-8 w-full max-w-lg px-8 py-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Escolha o Tema</h1>
          <p className="text-white/50 text-sm">
            As adivinhações baseiarão no tema escolhido.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {themes?.map((theme) => (
            <button
              key={theme.id}
              onClick={() => loadGame(theme)}
              disabled={loading}
              className="px-6 py-5 rounded-2xl glass border border-white/10
                         hover:border-amber-400/60 hover:bg-amber-400/10
                         text-white font-semibold text-lg
                         transition-all duration-300 active:scale-95
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-amber-400/10"
            >
              {theme.value}
            </button>
          ))}
        </div>
        {loading && (
          <p className="text-white/50 text-sm animate-pulse">Carregando partida...</p>
        )}
      </div>
    </Game>
  );
}
