import { ReactElement } from "react";
import "./Game.css";

interface GameProps {
  children: ReactElement;
}

export default function Game({ children }: GameProps) {
  return <div className="game">{children}</div>;
}
