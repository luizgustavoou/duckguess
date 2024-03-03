import Card from "../../components/Card";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectGame } from "../../slices/game-slice";
import Game from "../game/Game";
import "./GameChoose.css";

import { Link } from 'react-router-dom'

function GameChoose() {
  const {guesses} = useAppSelector(selectGame);
  console.log(guesses);
  return (
    <Game>
      <>
        <ul className="list">
          {guesses && guesses.map(guess => (
            <li className="element"><Link to={}><Card guess={guess} /></Link></li>
          ))}
        </ul>
      </>
    </Game>
  );
}

export default GameChoose;
