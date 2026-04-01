import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import DuckIcon from "../../assets/duck-writer.png"; // Or a different icon if available
import { HiOutlineX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { themeService } from "../../services";
import { useState } from "react";

const schema = z.object({
  value: z.string().min(1, "O nome do tema é obrigatório").max(20, "Máximo 20 caracteres"),
});

type FormData = z.infer<typeof schema>;

export interface IFormRegisterTheme {
  handleClose: () => void;
  onSuccess?: () => void;
}

export default function FormRegisterTheme({ handleClose, onSuccess }: IFormRegisterTheme) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: "",
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await themeService.createTheme(data.value);
      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("Erro ao cadastrar tema:", error);
      alert("Erro ao cadastrar tema. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-full max-w-sm mx-auto flex flex-col items-center gap-6 bg-navy-900/80 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl animate-in zoom-in-95 duration-300"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-4 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
      >
        <HiOutlineX size={22} />
      </button>

      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">Novo Tema</h2>
        <p className="text-white/40 text-xs text-center px-4">
          Crie uma nova categoria para organizar suas adivinhações.
        </p>
      </div>

      <img alt="duck-icon" src={DuckIcon} className="w-20 drop-shadow-lg opacity-80" />

      <div className="w-full flex flex-col gap-1">
        <label className="text-[10px] font-black text-white/30 ml-1 uppercase tracking-widest">Nome do Tema</label>
        <AppInput
          type="text"
          placeholder="Ex: Países, Filmes, Esportes..."
          {...register("value")}
        />
        {errors.value && <span className="text-red-400 text-[10px] font-bold mt-1 ml-1 uppercase tracking-tighter">{errors.value.message}</span>}
      </div>

      <div className="w-full pt-2">
        <AppButton
          content={isLoading ? "Criando..." : "Criar Tema"}
          type="submit"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
