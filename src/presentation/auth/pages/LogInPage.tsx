import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "../../components/TextField";
import { AuthService } from "../../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../stores";
import { useHandleError } from "../../../hooks";
import { Button } from "../../components/Button";
import { bg2 } from "../../App";

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
      onSuccess: ({ token, ...rest }) => {
        logIn(rest, token)
      },
      onError: error => showError({ responseError: error }),
    });

  return (
    <article className={`${bg2} p-6 h-full w-full flex flex-col gap-3 justify-center shadow-lg md:h-auto md:w-auto md:rounded-xl`}>
      <h1 className={'text-3xl font-semibold text-slate-600 dark:text-slate-300'}>Sign in</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
        <Button className="mt-2" loading={isPending} children="Sign in" />
        {/* <Divide label="or" />
        <Text variant="text-lg" className="sform-container_text">Don't have an account? <Link to={'/auth/register'}><strong>Sign up</strong></Link></Text> */}
      </form>
    </article>
  )
}