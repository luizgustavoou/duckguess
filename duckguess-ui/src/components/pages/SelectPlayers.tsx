import AppInput from "../form/AppInput"
import AppButton from "../form/AppButton"

export default function SelectPlayers () {
    return(
        <div className="main">
            <h1>Quem vai jogar?</h1>
            <AppInput type="text" text="Player 01" id="player01" />
            <AppInput type="text" text="Player 02" id="player02" />
            <AppButton content="Próximo" />
        </div>
    )
}
