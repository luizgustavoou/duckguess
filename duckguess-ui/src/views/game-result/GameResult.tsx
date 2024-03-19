import "./GameResult.css";
import duckWiner from "../../assets/duck-winer.png"
import duckCute from "../../assets/duck-cute.png"
import { useAppSelector } from "../../hooks/useAppSelector";
import { resetGame, selectGame } from "../../slices/game-slice";
import { useEffect, useState } from "react";
import Game from "../game/Game";
import AppButton from "../../components/form/AppButton";
import { RoutesPath } from "../../utils/routes-path";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function GameResult() {

  const { playerOne, playerTwo } = useAppSelector(selectGame);

  const [ winer, setWiner ] = useState("");
  
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate(RoutesPath.GAME_CHOOSE);
    dispatch(resetGame());
  }

  const result = () => {
    if(playerOne.score > playerTwo.score) {
      setWiner(playerOne.name);
    }
    else if ( playerOne.score < playerTwo.score ) {
      setWiner(playerTwo.name);
    }
  }

  useEffect(() => {
    result();
  }, []);

  return (
    <>
      <Game>
        <div className="game-result">
          {winer !== "" ? (
            <>
              <div className="game-result">
                <h1>Parabéns {winer}, você é o vencedor!!!</h1>
                <img className="img" alt="PatoVencedor" src={duckWiner} />
              </div>
            </>
          ) : (
            <>
              <div className="game-result">
                <h1>E foi empate!!!</h1>
                <img className="img" alt="PatoFofo" src={duckCute} />
              </div>
            </>
          )
          }
          <AppButton
            content={"Voltar a tela inicial"}
            type={"submit"}
            onClick={handleClick}
          />
        </div>
      </Game>
    </>
  );
}
