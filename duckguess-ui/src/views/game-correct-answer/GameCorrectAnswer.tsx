import "./GameCorrectAnswer.css";
import logo from "../../assets/pato-festero.png"

function GameCorrectAnswer() {
  return (
    <>
      <h1>Resposta correta, parabéns!!!</h1>
      <img alt="PatoFestero" src={logo} />
    </>
  );
}

export default GameCorrectAnswer;
