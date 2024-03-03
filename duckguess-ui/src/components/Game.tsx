import { ReactElement } from "react";
import "./Game.css";

interface GameProps {
  children: ReactElement;
}

function Game({ children }: GameProps) {
  return <div className="game">{children}</div>;
}

export default Game;
