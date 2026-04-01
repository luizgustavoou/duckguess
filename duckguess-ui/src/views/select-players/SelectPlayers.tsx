import { SubmitHandler, useForm } from "react-hook-form";
import { AppInput } from "../../components/form/AppInput";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";
import Game from "../game/Game";
import AppButton from "../../components/form/AppButton";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setPlayers } from "../../slices/game-slice";

interface IFormInput {
  playerOne: string;
  playerTwo: string;
}

const selectPlayerFormSchema: ZodType<IFormInput> = z.object({
  playerOne: z.string().min(3),
  playerTwo: z.string().min(3),
});

type SelectPlayerFormSchema = z.infer<typeof selectPlayerFormSchema>;

export default function SelectPlayers() {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SelectPlayerFormSchema>({
    resolver: zodResolver(selectPlayerFormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await dispatch(
      setPlayers({ namePlayerOne: data.playerOne, namePlayerTwo: data.playerTwo })
    );
    navigate(RoutesPath.GAME_CHOOSE);
  };

  return (
    <Game>
      <div className="flex flex-col items-center gap-8 w-full max-w-sm px-8 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gradient">Quem vai jogar?</h1>
          <p className="text-white/40 text-sm mt-1">Mínimo 3 caracteres por nome</p>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <AppInput type="text" placeholder="🎮  Jogador 1" {...register("playerOne")} />
            {errors.playerOne && (
              <p className="text-rose-400 text-xs mt-1 text-center">Mínimo 3 caracteres</p>
            )}
          </div>
          <div>
            <AppInput type="text" placeholder="🎮  Jogador 2" {...register("playerTwo")} />
            {errors.playerTwo && (
              <p className="text-rose-400 text-xs mt-1 text-center">Mínimo 3 caracteres</p>
            )}
          </div>
          <div className="flex justify-center mt-2">
            <AppButton content="Próximo →" type="submit" />
          </div>
        </form>
      </div>
    </Game>
  );
}
