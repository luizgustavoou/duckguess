import logo from "../../assets/duck-sing-removebg-preview.png";
import AppButton from "../../components/form/AppButton";
import { RoutesPath } from "../../utils/routes-path";
import { useAppNavigate } from "../../hooks/useAppNavigate";

export default function Home() {
  const navigate = useAppNavigate();

  const handlePlayClick = () => navigate(RoutesPath.GAME_THEME);
  const handleRulesClick = () => navigate(RoutesPath.RULES);
  const handleLoginClick = () => navigate(RoutesPath.LOGIN);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 py-8 animate-fade-in-up">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient tracking-tight">
          Jogo das Três Pistas
        </h1>
        <p className="text-white/50 text-sm font-medium tracking-widest uppercase">
          Descubra a palavra secreta
        </p>
      </div>

      {/* Duck image */}
      <div className="relative flex justify-center">
        <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-3xl scale-75" />
        <img
          alt="PatoMarketero"
          src={logo}
          className="relative w-52 md:w-64 drop-shadow-2xl animate-float"
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-4 items-center w-full max-w-xs">
        <AppButton content="🎮  Jogar" type="button" onClick={handlePlayClick} />
        <AppButton content="📋  Regras" type="button" onClick={handleRulesClick} />
        <AppButton content="🔐  Admin" type="button" onClick={handleLoginClick} />
      </div>
    </div>
  );
}
