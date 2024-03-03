import "./Home.css";
import logo from "../../assets/duck-sing-removebg-preview.png";
import AppButton from "../../components/form/AppButton";

export default function Home() {
  return (
    <div className="home">
      <h1>Jogo das três pistas</h1>
      <div className="box">
        <img alt="PatoMarketero" src={logo} />
      </div>
      <div className="actions">
        <AppButton content="Jogar" type="button" />
        <AppButton content="Regras" type="button" />
      </div>
    </div>
  );
}
