import AppButton from "../../components/form/AppButton";
import { AppInput } from "../../components/form/AppInput";
import Game from "../game/Game";
import DuckLogin from "../../assets/duck-login.png";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { RoutesPath } from "../../utils/routes-path";
import { ZodType, z } from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { signin } from "../../slices/auth-slice";

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
  const navigate = useAppNavigate();

  const onSubmit: SubmitHandler<IFormSignin> = async (data) => {
    const { email, password } = data;
    await dispatch(signin({ email, password }));
    navigate(RoutesPath.REGISTER_GUESS);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
  });

  return (
    <Game>
      <form
        className="flex flex-col items-center gap-6 w-full max-w-sm px-8 py-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-gradient">Admin Login</h1>
        <img
          src={DuckLogin}
          alt="duck-login"
          className="w-36 rounded-3xl shadow-lg shadow-indigo-900/40"
        />
        <div className="w-full space-y-3">
          <AppInput type="text" placeholder="Email..." {...register("email")} />
          {errors.email && (
            <p className="text-rose-400 text-xs text-center">{errors.email.message}</p>
          )}
          <AppInput type="password" placeholder="Senha..." {...register("password")} />
          {errors.password && (
            <p className="text-rose-400 text-xs text-center">Mínimo 5 caracteres</p>
          )}
        </div>
        <AppButton content="Entrar" type="submit" />
      </form>
    </Game>
  );
}
