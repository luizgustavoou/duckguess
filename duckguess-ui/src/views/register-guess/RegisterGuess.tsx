import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import Game from "../game/Game";
import "./RegisterGuess.css"
import DuckWriter from "../../assets/duck-writer.png"

export default function RegisterGuess() {
    return(
        <Game>
            <div className="register-guess-body">
                <div className="register-guess">
                    <img alt="duck-writer" src={DuckWriter} />
                    <AppInput
                        type="text"
                        placeholder="Theme"
                    />
                    <AppInput
                        type="text"
                        placeholder="Guess"
                    />
                    <AppInput
                        type="text"
                        placeholder="Hint 01"
                    />
                    <AppInput
                        type="text"
                        placeholder="Hint 02"
                    />
                    <AppInput
                        type="text"
                        placeholder="Hint 03"
                    />
                    <AppButton
                        content={"Register Guess"}
                        type={"button"}
                    />
                </div>
            </div>
        </Game>
    )
}
