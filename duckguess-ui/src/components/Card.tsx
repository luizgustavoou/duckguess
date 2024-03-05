import "./Card.css";

import { ImEnvelop } from "react-icons/im";
import { IGuess } from "../entities/IGuess";

interface CardProps {
  guess: IGuess;
  handleClick: (guess: IGuess) => void;
}

export default function Card({ guess, handleClick }: CardProps) {
  return (
    <>
      <ImEnvelop className="item" onClick={(e) => handleClick(guess)} />
    </>
  );
}
