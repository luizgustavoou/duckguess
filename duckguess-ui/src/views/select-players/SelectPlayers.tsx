// ver dps: https://github.com/Giftea/zod-rhf-fcc/blob/main/app/components/FormField.tsx

import "./SelectPlayers.css";

import { SubmitHandler, useForm } from "react-hook-form";
import { AppInput } from "../../components/form/AppInput";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";
import Game from "../game/Game";
import AppButton from "../../components/form/AppButton";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { resetGame, selectGame, startGame } from "../../slices/game-slice";
import { useAppSelector } from "../../hooks/useAppSelector";

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
      startGame({
        namePlayerOne: data.playerOne,
        namePlayerTwo: data.playerTwo,
      })
    );

    navigate(RoutesPath.GAME_CHOOSE);
  };

  return (
    <Game>
      <div className="select-players">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Quem vai jogar?</h1>
          <AppInput
            type="text"
            placeholder="Player 01"
            {...register("playerOne")}
          />

          <AppInput
            type="text"
            placeholder="Player 02"
            {...register("playerTwo")}
          />
          <AppButton content="Próximo" type="submit" />
        </form>
      </div>
    </Game>
  );
}
