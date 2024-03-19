import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import Game from "../game/Game";
import "./RegisterGuess.css"

export default function RegisterGuess() {
    return(
        <Game>
            <div className="register-guess">
                <div className="">
                    <AppInput
                        type="text"
                        placeholder="Theme"
                    />
                </div>
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
        </Game>
    )
}
