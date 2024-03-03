import { ImEnvelop } from "react-icons/im";
import { IGuess } from "../entities/IGuess";

interface CardProps {
    guess: IGuess;
}
export default function Card ({guess}: CardProps) {
    console.log(guess);
    return(
        <>
            <ImEnvelop width="" />
        </>
    )
}
