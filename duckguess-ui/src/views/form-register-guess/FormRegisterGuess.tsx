import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import DuckWriter from "../../assets/duck-writer.png";
import AppSelect from "../../components/form/AppSelect";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineX } from "react-icons/hi";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { guessService, themeService, hintService } from "../../services";
import { useEffect, useState } from "react";
import { ITheme } from "../../entities/ITheme";

const schema = z.object({
  themeId: z.string().min(1, "O tema é obrigatório"),
  answer: z.string().min(1, "A resposta é obrigatória").max(12, "Máximo 12 caracteres"),
  hints: z.array(z.object({
    text: z.string().min(1, "A dica é obrigatória").max(45, "Máximo 45 caracteres")
  })).min(3, "Mínimo de 3 dicas").max(10, "Máximo de 10 dicas")
});

type FormData = z.infer<typeof schema>;

export interface IFormRegisterGuess {
  handleClose: () => void;
  onSuccess?: () => void;
}

export default function FormRegisterGuess({ handleClose, onSuccess }: IFormRegisterGuess) {
  const [themes, setThemes] = useState<ITheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      themeId: "",
      answer: "",
      hints: [{ text: "" }, { text: "" }, { text: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hints"
  });

  useEffect(() => {
    themeService.getAllThemes().then(setThemes).catch(console.error);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const newGuess = await guessService.create(data.answer, data.themeId);

      // Create hints sequentially to ensure they are linked to the new guess
      await Promise.all(data.hints.map(hint => hintService.create(hint.text, newGuess.id)));

      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("Erro ao cadastrar adivinhação:", error);
      alert("Erro ao cadastrar adivinhação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-full max-w-md mx-auto flex flex-col items-center gap-4 bg-navy-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-lg shadow-2xl"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-4 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
      >
        <HiOutlineX size={22} />
      </button>

      <h2 className="text-2xl font-bold text-gradient">Nova Adivinhação</h2>

      <img alt="duck-writer" src={DuckWriter} className="w-24 drop-shadow-lg mb-2" />

      <div className="w-full flex flex-col gap-4 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-white/50 ml-1">TEMA</label>
          <AppSelect
            options={themes}
            {...register("themeId")}
          />
          {errors.themeId && <span className="text-red-400 text-xs mt-1 ml-1">{errors.themeId.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-white/50 ml-1">RESPOSTA</label>
          <AppInput
            type="text"
            placeholder="Ex: JavaScript"
            {...register("answer")}
          />
          {errors.answer && <span className="text-red-400 text-xs mt-1 ml-1">{errors.answer.message}</span>}
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center justify-between ml-1">
            <label className="text-xs font-semibold text-white/50">DICAS ({fields.length}/10)</label>
            {fields.length < 10 && (
              <button
                type="button"
                onClick={() => append({ text: "" })}
                className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider"
              >
                <HiOutlinePlus size={14} /> Adicionar Dica
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <AppInput
                      type="text"
                      placeholder={`Dica ${index + 1}`}
                      {...register(`hints.${index}.text` as const)}
                    />
                  </div>
                  {fields.length > 3 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all border border-white/5"
                    >
                      <HiOutlineMinus size={18} />
                    </button>
                  )}
                </div>
                {errors.hints?.[index]?.text && (
                  <span className="text-red-400 text-xs mt-1 ml-1">{errors.hints[index]?.text?.message}</span>
                )}
              </div>
            ))}
          </div>
          {errors.hints?.root && <span className="text-red-400 text-xs mt-1 ml-1">{errors.hints.root.message}</span>}
        </div>
      </div>

      <div className="w-full mt-4">
        <AppButton
          content={isLoading ? "Salvando..." : "Salvar Adivinhação"}
          type="submit"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
