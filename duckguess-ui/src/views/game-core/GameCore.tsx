import { useEffect, useMemo, useState } from "react";
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
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ZodType, z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";
import { compareAnswer } from "../../utils/compare-answer";

interface IFormInput {
  answer: string;
}

const gameCoreFormSchema: ZodType<IFormInput> = z.object({
  answer: z.string().min(1),
});

type GameCoreFormSchema = z.infer<typeof gameCoreFormSchema>;

export default function GameCore() {
  const navigate = useAppNavigate();
  const [score, setScore] = useState(10);

  const {
    register,
    handleSubmit,
    resetField,
  } = useForm<GameCoreFormSchema>({ resolver: zodResolver(gameCoreFormSchema) });

  const dispatch = useAppDispatch();
  const [hintIndex, setHintIndex] = useState<number>(0);
  const { guess, playerOne, playerTwo, playerTurn, } = useAppSelector(selectGame);

  const [playerCore, setPlayerCore] = useState<"playerOne" | "playerTwo" | null>(null);

  useEffect(() => {
    if (!playerTurn) return;
    setPlayerCore(playerTurn);
  }, [playerTurn]);

  const nextPlayer = () => {
    setPlayerCore((p) => (p === "playerOne" ? "playerTwo" : "playerOne"));
  };

  const checkAnswer = (answer: string, scoreGuess: number) => {
    if (!guess) return;
    if (compareAnswer(answer, guess.answer)) {
      if (playerCore === "playerOne") dispatch(increaseScorePlayerOne(scoreGuess));
      else dispatch(increaseScorePlayerTwo(scoreGuess));
      return navigate(RoutesPath.GAME_CORRECT_ANSWER);
    } else {
      if (hintIndex + 1 === guess.hints.length) return navigate(RoutesPath.GAME_WRONG_ANSWER);
    }
    nextPlayer();
    setHintIndex((v) => v + 1);
  };

  const player = useMemo(
    () => (playerCore === "playerOne" ? playerOne : playerTwo),
    [playerCore]
  );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setScore((s) => s - 1);
    checkAnswer(data.answer, score);
    resetField("answer");
  };

  return (
    <Game>
      <div className="flex flex-col items-center gap-6 w-full px-6 py-8">

        {/* Scoreboard */}
        <div className="flex gap-6 w-full max-w-md justify-center">
          <div className="flex-1 rounded-2xl p-4 text-center text-white font-bold
                          bg-gradient-to-br from-rose-700 to-rose-500 shadow-lg shadow-rose-900/40">
            <p className="text-xs uppercase tracking-widest opacity-70">{playerOne.name}</p>
            <p className="text-3xl mt-1">{playerOne.score}</p>
          </div>
          <div className="flex-1 rounded-2xl p-4 text-center text-white font-bold
                          bg-gradient-to-br from-indigo-700 to-indigo-500 shadow-lg shadow-indigo-900/40">
            <p className="text-xs uppercase tracking-widest opacity-70">{playerTwo.name}</p>
            <p className="text-3xl mt-1">{playerTwo.score}</p>
          </div>
        </div>

        {/* Hints */}
        <div className="flex flex-col gap-5 items-center w-full max-w-xl flex-grow px-6">
          {guess?.hints &&
            guess.hints.map(
              (hint, index) =>
                index <= hintIndex && (
                  <Hint hint={hint} numberPoints={10 - index} index={index} key={hint.id} />
                )
            )}
        </div>

        {/* Answer form */}
        <div className="flex flex-col items-center gap-3 w-full max-w-lg px-4 py-4 rounded-2xl glass">
          <h3 className="text-white/70 text-sm uppercase tracking-widest">
            Vez de{" "}
            <span className="text-amber-400 font-semibold text-base">{player.name}</span>
          </h3>
          <form className="flex gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
            <AppInput
              type="text"
              placeholder="Digite a resposta..."
              {...register("answer")}
            />
            <AppButton content="✓" type="submit" />
          </form>
        </div>
      </div>
    </Game>
  );
}
