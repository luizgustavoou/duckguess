import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import Game from "../game/Game";
import "./Login.css"
import DuckLogin from "../../assets/duck-login.png"

export default function Login() {
    return(

        <Game>
            <div className="login">
                <img src={DuckLogin} alt="duck-login" />
                <AppInput
                    type="text"
                    placeholder="User"
                />
                <AppInput
                    type="text"
                    placeholder="PassWord"
                />
                <AppButton
                    content={"Login"}
                    type={"button"}
                />
            </div>
        </Game>
    )
}
