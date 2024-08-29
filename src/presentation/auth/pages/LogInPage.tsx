import { SubmitHandler, useForm } from "react-hook-form";
import { Text } from '../../components/Text';
import { Link } from "react-router-dom";
import { TextField } from "../../components/TextField";
import { AuthService } from "../../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../stores";
import { useHandleError } from "../../../hooks";
import { Button } from "../../components/Button";
import { Divide } from "../../components/Divide";

type InputsLogIn = {
  userName: string,
  password: string
}

export const LogInPage = () => {
  const { handleSubmit, control } = useForm<InputsLogIn>({ defaultValues: { userName: '', password: '' } });
  const logIn = useAuthStore(state => state.logIn);
  const { showError } = useHandleError();
  const { mutate, isPending } = useMutation({ mutationKey: ['logIn'], mutationFn: AuthService.login, retry: 0 });

  const onSubmit: SubmitHandler<InputsLogIn> = async (data) =>
    mutate(data, {
      onSuccess: ({ token, ...rest }) => logIn(rest, token),
      onError: error => showError({ responseError: error }),
    });

  return (
    <article className="w-max h-max min-w-[400px] bg-slate-50 dark:bg-slate-900 p-[2rem] rounded-xl flex flex-col gap-3 shadow-md dark:shadow-slate-700">
      <h1 className={'text-3xl font-semibold text-slate-600 dark:text-slate-300'}>Sign in</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          control={control}
          name="userName"
          labelText="User"
        />
        <TextField
          control={control}
          name="password"
          labelText="Password"
          type="password"
        />
        <Button loading={isPending} children="Sign in" />
        <Divide label="or" />
        <Text variant="text-lg" className="sform-container_text">Don't have an account? <Link to={'/auth/register'}><strong>Sign up</strong></Link></Text>
      </form>
    </article>
  )
}