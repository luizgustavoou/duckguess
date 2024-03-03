import "./SelectPlayers.css";

import AppInput from "../form/AppInput";
import AppButton from "../form/AppButton";

export default function SelectPlayers() {
  return (
    <div className="select-player">
      <form>
        <h1>Quem vai jogar?</h1>
        <AppInput type="text" placeholder="Player 01" />

        <AppInput type="text" placeholder="Player 02" />
        <AppButton content="Próximo" />
      </form>
    </div>
  );
}
