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
import "./GameCore.css";
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
    formState: { errors },
    resetField,
  } = useForm<GameCoreFormSchema>({
    resolver: zodResolver(gameCoreFormSchema),
  });

  const dispatch = useAppDispatch();

  const [hintIndex, setHintIndex] = useState<number>(0);

  const { guess, playerOne, playerTwo, playerTurn } =
    useAppSelector(selectGame);

  const [playerCore, setPlayerCore] = useState<
    "playerOne" | "playerTwo" | null
  >(null);

  useEffect(() => {
    if (!playerTurn) return;

    setPlayerCore(playerTurn);
  }, [playerTurn]);

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

  const nextScore = () => {
    setScore((s) => s - 1);
  };

  const checkAnswer = (answer: string, scoreGuess: number) => {
    if (!guess) return;

    // TODO: Melhorar esse monte de if e else.
    if (compareAnswer(answer, guess.answer)) {
      if (playerCore === "playerOne") {
        dispatch(increaseScorePlayerOne(scoreGuess));
      } else {
        dispatch(increaseScorePlayerTwo(scoreGuess));
      }

      return navigate(RoutesPath.GAME_CORRECT_ANSWER);
    } else {
      if (hintIndex + 1 === guess.hints.length) {
        return navigate(RoutesPath.GAME_WRONG_ANSWER);
      }
    }

    nextPlayer();
    nextHintIndex();
  };

  const player = useMemo(() => {
    if (playerCore === "playerOne") {
      return playerOne;
    }

    return playerTwo;
  }, [playerCore]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    nextScore();
    const { answer } = data;

    checkAnswer(answer, score);

    resetField("answer");
  };

  return (
    <Game>
      <div className="game-core">
        <div className="info">
          <div className="score">
            <div className="player">
              <p>{playerOne.name}</p>
              <p>{playerOne.score}</p>
            </div>
            <div className="player">
              <p>{playerTwo.name}</p>
              <p>{playerTwo.score}</p>
            </div>
          </div>
        </div>

        <div className="hints">
          {guess?.hints &&
            guess.hints.map(
              (hint, index) =>
                index <= hintIndex && (
                  <Hint hint={hint} numberPoints={10 - index} key={hint.id} />
                )
            )}
        </div>

        <div className="answer">
          <h1>Agora é a vez de {player.name}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AppInput
              type="text"
              placeholder="Digite a resposta"
              {...register("answer")}
            />
            <AppButton content={"Enviar"} type={"submit"} />
          </form>
        </div>
      </div>
    </Game>
  );
}
