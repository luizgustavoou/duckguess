import "./SelectPlayers.css";

import AppButton from "./form/AppButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppInput } from "./form/AppInput";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SelectPlayerFormSchema>({
    resolver: zodResolver(selectPlayerFormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="select-player">
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
  );
}
