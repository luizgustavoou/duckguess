import { useAppSelector } from "../../hooks/useAppSelector";
import { selectGame } from "../../slices/game-slice";
import "./GameCore.css";

function GameCore() {
  const { guess } = useAppSelector(selectGame);

  console.log(guess);
  return (
    <>
      <h1>GameCore page!</h1>
    </>
  );
}

export default GameCore;
