import { useCallback, useState } from "react";
import { Text } from "../Text";
import { useAuthStore } from "../../../stores";
import { ModalContent } from "../../interfaces/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "../TextField";
import { toast } from "sonner";
import { useHandleError, useUpdateUser } from "../../../hooks";

interface Inputs { newPassword: string; confirm: string; }

export const UserModalContent = <T extends object>({ dialog, reference, rect }: ModalContent<T>) => {
    const user = useAuthStore(state => state.user);
    const logOut = useAuthStore(state => state.logOut);
    const [isChangePassword, setIsChangePassword] = useState(false);

    const { mutate } = useUpdateUser();
    const { showError, Message } = useHandleError();

    const { handleSubmit, control, reset, setError } = useForm<Inputs>({
        defaultValues: {
            newPassword: '',
            confirm: ''
        }
    });

    const onSubmit: SubmitHandler<Inputs> = async ({ confirm, newPassword }) => {
        if (confirm !== newPassword) setError("confirm", { message: 'Password do not match' });
        else {
            mutate({ id: user?.id ?? '', user: { password: confirm } }, {
                onSuccess: () => {
                    reset();
                    logOut();
                    toast.success(`password was updated`);
                },
                onError: error => {
                    const err = Message(error);
                    if (err.includes('password')) setError('newPassword', { message: err });
                    else showError({ responseError: error });
                }
            });
        }
    }

    const onAnimationEnd = useCallback(
        ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-down-top-right')) {
                currentTarget.classList.toggle('scale-down-top-right');
                dialog.current?.close();
                setIsChangePassword(false);
            }
        },
        [dialog],
    );

    const onClickExit = useCallback(
        () => {
            reference.current?.classList.add('scale-down-top-right');
            reference.current?.addEventListener('animationend', () => {
                logOut();
            });
        },
        [reference, logOut],
    );

    const FormChangePassword = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="change-password">
                <Text>Enter your new password</Text>
                <TextField
                    control={control}
                    name="newPassword"
                    labelText="New password"
                    autoComplete="current-password"
                    autoCapitalize="none"
                    type="password"
                />
                <TextField
                    control={control}
                    name="confirm"
                    labelText="Confirm password"
                    autoComplete="current-password"
                    autoCapitalize="none"
                    type="password"
                />
                <div className="buttons">
                    <button className="button-small" type="submit">Change</button>
                    <button className="button-small cancel" onClick={() => setIsChangePassword(false)}>Cancel</button>
                </div>
            </form>
        )
    }

    return (
        <div onAnimationEnd={onAnimationEnd} ref={reference} className='user-modal scale-up-top-right' style={rect && { top: rect.bottom, right: rect.width }} >
            <section className='details'>
                <Text children={user?.userName} />
                <Text children={user?.fullName} />
            </section>
            <div className='separator' />
            {
                isChangePassword
                    ? <FormChangePassword />
                    :
                    <>
                        <section className='details details-flex'>
                            <button onClick={() => setIsChangePassword(true)}>Chage password</button>
                        </section>
                        <div className='separator' />
                        <section className='details details-flex'>
                            <button onClick={onClickExit}>Sign off</button>
                        </section>
                    </>
            }
        </div>
    )
}
