import "./App.css";
import AppButton from "./components/form/AppButton";
import Home from "./components/pages/Home";
import SelectPlayers from "./components/pages/SelectPlayers";

export default function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>Jogo das três pistas</h1>
      </div>

      <SelectPlayers />

      <div className="footer">
        <AppButton content="Jogar" />
        <AppButton content="Regras" />
      </div>
    </div>
  );
}
