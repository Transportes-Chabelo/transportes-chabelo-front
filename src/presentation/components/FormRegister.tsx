import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "./TextField";
import { useAuthStore } from "../../stores";
import { TypeUser } from "../../interfaces";
import { SelectField } from "./SelectField";
import { useHandleError, useNewUser } from "../../hooks";
import { PropsForm } from "../interfaces/interfaces";
import { toast } from "sonner";
import { Button } from "./Button";
import { propsUserCreate } from '../../interfaces/service.interface';

type Inputs = propsUserCreate;

const options: Array<{ value: TypeUser, label: string }> = [
    { label: TypeUser.admin, value: TypeUser.admin },
    { label: TypeUser.user, value: TypeUser.user }
];

export const FormUserRegister = <T extends object>({ onSuccess }: PropsForm<T>) => {
    const user = useAuthStore(store => store.user);
    const { handleSubmit, control, reset, setError } = useForm<Inputs>({ defaultValues: { fullName: '', userName: '' } });

    const { mutate, isPending } = useNewUser();
    const { showError, Message } = useHandleError();

    const onSubmit: SubmitHandler<Inputs> = async ({ role, ...inputs }) => {
        mutate({ ...inputs, role: role ? role?.value : undefined }, {
            onSuccess: user => {
                reset();
                if (onSuccess) onSuccess({ exit: true });
                toast.success(`User ${user.fullName} with username: ${user.userName} was created`)
            },
            onError: error => {
                const err = Message(error);
                if (err.includes('fullName')) setError('fullName', { message: err });
                else if (err.includes('userName')) setError('userName', { message: err });
                else if (err.includes('phone')) setError('phone', { message: err });
                else if (err.includes('role')) setError('role', { message: err });
                else showError({ responseError: error });
            }
        });
    };

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                control={control}
                name="fullName"
                labelText="Full name"
                autoCapitalize="none"
            />
            <span className="flex  items-center gap-3">
                <TextField
                    control={control}
                    name="userName"
                    autoComplete="username"
                    labelText="User"
                />
                {
                    (user && user.role !== TypeUser.user) &&
                    <SelectField
                        control={control}
                        name="role"
                        placeholder="Select user type... "
                        options={options}
                    />
                }
            </span>
            <span className="flex  items-center gap-3">
                <TextField
                    control={control}
                    type="number"
                    maxLength={10}
                    name="phone"
                    labelText="Phone"
                    autoCapitalize="none"
                />
                <TextField
                    control={control}
                    name="password"
                    labelText="Password"
                    autoCapitalize="none"
                />
            </span>
            <div className="flex justify-center">
                <Button className="px-6" full={false} loading={isPending} children={user ? 'Add user' : 'Create your account'} />
            </div>
        </form>
    )
}
