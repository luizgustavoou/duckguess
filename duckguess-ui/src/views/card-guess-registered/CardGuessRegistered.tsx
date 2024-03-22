import { IGuess } from "../../entities/IGuess"
import "./CardGuessRegistered.css"
import { AiOutlineArrowDown } from "react-icons/ai";

interface CardGuessRegisteredProps {
    guess: IGuess;
}

export default function CardGuessRegistered({ guess }: CardGuessRegisteredProps) {
    return(
        <div className="card-guess-registered">
            <input type="checkbox" id={guess.id} />
            <label className="header" htmlFor={guess.id} >
                <span>{guess.answer}</span>
                <i><AiOutlineArrowDown /></i>
            </label>
            <div className="content">
                {guess.hints && (guess.hints.map((hint) => {
                    return(
                        <div className="hint">{hint.text}</div>
                    )
                }))}
            </div>
        </div>
    )
}
