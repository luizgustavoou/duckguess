import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import DuckWriter from "../../assets/duck-writer.png";
import AppSelect from "../../components/form/AppSelect";
import { HiOutlineX } from "react-icons/hi";

export interface IFormRegisterGuess {
  handleClose: () => void;
}

export default function FormRegisterGuess({ handleClose }: IFormRegisterGuess) {
  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center gap-4">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
      >
        <HiOutlineX size={22} />
      </button>

      <h2 className="text-xl font-bold text-gradient">Nova Adivinhação</h2>

      <img alt="duck-writer" src={DuckWriter} className="w-24 drop-shadow-lg" />

      <div className="w-full flex flex-col gap-3">
        <AppSelect content={["Opção 01", "Opção 02", "Opção 03", "Opção 04"]} />
        <AppInput type="text" placeholder="Resposta (palavra secreta)" />
        <AppInput type="text" placeholder="Dica 1" />
        <AppInput type="text" placeholder="Dica 2" />
        <AppInput type="text" placeholder="Dica 3" />
      </div>

      <AppButton content="Salvar" type="button" />
    </div>
  );
}
