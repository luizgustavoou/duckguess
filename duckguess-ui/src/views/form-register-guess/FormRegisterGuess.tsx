import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import Game from "../game/Game";
import DuckWriter from "../../assets/duck-writer.png"
import "./FormRegisterGuess.css"

export default function FormRegisterGuess() {
    return(
        <div className="form-register-guess">
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

    )
}
