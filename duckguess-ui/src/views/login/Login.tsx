import "./Login.css";
import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import Game from "../game/Game";
import DuckLogin from "../../assets/duck-login.png";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";
import { ZodType, z } from "zod";

import { MouseEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectAuth, signin } from "../../slices/auth-slice";

interface IFormSignin {
  email: string;
  password: string;
}

const signinFormSchema: ZodType<IFormSignin> = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(5),
});

type SigninFormSchema = z.infer<typeof signinFormSchema>;

export default function Login() {
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormSignin> = async (data) => {
    const { email, password } = data;

    await dispatch(signin({ email, password }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
  });

  const navigate = useAppNavigate();

  const handleBackClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    navigate(RoutesPath.HOME);
  };

  return (
    <Game>
      <form className="login" onSubmit={handleSubmit(onSubmit)}>
        <img src={DuckLogin} alt="duck-login" />
        <AppInput type="text" placeholder="Email..." {...register("email")} />
        <AppInput
          type="password"
          placeholder="Password..."
          {...register("password")}
        />
        <AppButton content={"Login"} type={"submit"} />
      </form>
      {/* <AppButton
          content={"Voltar"}
          type={"button"}
          onClick={handleBackClick}
        /> */}
    </Game>
  );
}
