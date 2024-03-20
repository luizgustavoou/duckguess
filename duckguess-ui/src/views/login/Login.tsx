import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import Game from "../game/Game";
import "./Login.css"
import DuckLogin from "../../assets/duck-login.png"
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";

export default function Login() {

    const navigate = useAppNavigate();

    const handleLoginClick = (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        navigate(RoutesPath.REGISTER_GUESS);
    }

    const handleBackClick = (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        navigate(RoutesPath.HOME);
    }

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
                    onClick={handleLoginClick}
                />
                <AppButton
                    content={"Voltar"}
                    type={"button"}
                    onClick={handleBackClick}
                />
            </div>
        </Game>
    )
}
