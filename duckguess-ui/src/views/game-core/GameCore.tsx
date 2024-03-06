import { useMemo, useState, MouseEvent, useEffect } from "react";
import Hint from "../../components/Hint";
import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  increaseScorePlayerOne,
  increaseScorePlayerTwo,
  selectGame,
} from "../../slices/game-slice";
import Game from "../game/Game";
import "./GameCore.css";
import { SlActionRedo } from "react-icons/sl";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ZodType, z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormInput {
  answer: string;
}

const gameCoreFormSchema: ZodType<IFormInput> = z.object({
  answer: z.string(),
});

type GameCoreFormSchema = z.infer<typeof gameCoreFormSchema>;

export default function GameCore() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<GameCoreFormSchema>({
    resolver: zodResolver(gameCoreFormSchema),
  });

  const dispatch = useAppDispatch();

  const [hintIndex, setHintIndex] = useState<number>(0);

  const { guess, playerOne, playerTwo } = useAppSelector(selectGame);

  const [playerCore, setPlayerCore] = useState<"playerOne" | "playerTwo">(
    "playerOne"
  );

  const nextPlayer = () => {
    if (playerCore === "playerOne") {
      setPlayerCore("playerTwo");
      return;
    }

    setPlayerCore("playerOne");
  };

  const nextHintIndex = () => {
    if (!guess?.hints) return;

    setHintIndex((value) => value + 1);
  };

  const checkAnswer = (answer: string, score: number) => {
    console.log({ answer, score });
    if (!guess) return;

    if (answer != guess.answer) return;

    if (playerCore === "playerOne") {
      dispatch(increaseScorePlayerOne(10));
    } else {
      dispatch(increaseScorePlayerTwo(10));
    }
  };

  const player = useMemo(() => {
    if (playerCore === "playerOne") {
      return playerOne;
    }

    return playerTwo;
  }, [playerCore]);

  // const handleSendAnswer = (
  //   e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  // ) => {
  //   nextPlayer();
  //   nextHintIndex();

  //   checkAnswer(answer, 10);
  // };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { answer } = data;

    nextPlayer();
    nextHintIndex();
    checkAnswer(data.answer, 10);

    resetField("answer");
  };

  return (
    <Game>
      <div className="game-core">
        <div className="info">
          <div className="players">
            <div className="player">
              <p>{playerOne.name}</p>
              <p>{playerOne.score}</p>
            </div>
            <div className="player">
              <p>{playerTwo.name}</p>
              <p>{playerTwo.score}</p>
            </div>
          </div>

          <div className="actions">
            <SlActionRedo /> Pular a vez
          </div>
        </div>

        <div className="hints">
          {guess?.hints &&
            guess.hints.map((hint, index) => (
              <>
                {index <= hintIndex && (
                  <Hint hint={hint} numberPoints={10} key={hint.id} />
                )}
              </>
            ))}
        </div>

        <form className="answer" onSubmit={handleSubmit(onSubmit)}>
          <h1>Agora é a vez de {player.name}</h1>
          <AppInput
            type="text"
            placeholder="Digite a resposta"
            {...register("answer")}
          />
          <AppButton content={"Enviar"} type={"submit"} />
        </form>
      </div>
    </Game>
  );
}
