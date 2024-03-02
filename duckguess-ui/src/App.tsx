import "./App.css";
import AppButton from "./components/form/AppButton";
import logo from "./assets/duck-sing-removebg-preview.png";

export default function App() {
  return (
    <div className="container">
      <div className="header"></div>

      <div className="main">
        <div className="image-reference">
          <img alt="PatoMarketero" src={logo} />
          <p>
            <span>Duck</span>
            Guess
          </p>
        </div>
      </div>

      <div className="footer">
        <AppButton content="Jogar" />
        <AppButton content="Regras" />
      </div>
    </div>
  );
}
