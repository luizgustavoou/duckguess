import "./App.css";
import AppButton from "./components/form/AppButton";
import logo from "./assets/duck-sing-removebg-preview.png";

export default function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>
          <span>Duck</span>
          Guess
        </h1>
      </div>

      <div className="main">
        <img alt="PatoMarketero" src={logo} />
      </div>

      <div className="footer">
        <AppButton content="Jogar" />
        <AppButton content="Regras" />
      </div>
    </div>
  );
}
