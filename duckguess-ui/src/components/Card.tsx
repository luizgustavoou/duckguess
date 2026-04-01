import { ImEnvelop } from "react-icons/im";
import { IGuess } from "../entities/IGuess";

interface CardProps {
  guess: IGuess;
  handleClick: (guess: IGuess) => void;
}

export default function Card({ guess, handleClick }: CardProps) {
  return (
    <button
      onClick={() => handleClick(guess)}
      className="group flex items-center justify-center w-full h-full 
                 rounded-2xl glass border border-amber-400/30
                 hover:border-amber-400/80 hover:bg-amber-400/10
                 transition-all duration-300 cursor-pointer
                 shadow-lg hover:shadow-amber-400/20 active:scale-95"
    >
      <ImEnvelop className="w-8 h-8 text-amber-300/70 group-hover:text-amber-300 group-hover:scale-110 transition-all duration-300" />
    </button>
  );
}
