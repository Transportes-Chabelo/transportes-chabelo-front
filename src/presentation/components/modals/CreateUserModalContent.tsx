import { X } from "../../icons/icons";
import { ModalContent } from "../../interfaces/interfaces";
import { FormUserRegister } from "../FormRegister";
import { IconBtn } from "../IconBtn";

export const CreateUserModalContent = <T extends object>({ dialog, onSuccess }: ModalContent<T>) => {

    const Success = (exit: boolean) => {
        onSuccess && onSuccess({ exit });
        dialog.current?.close()
    }

    return (
        <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl shadow-xl dark:shadow-slate-950">
            <span className="flex mb-4 justify-between items-center">
                <h1 className="text-2xl font-semibold">Create user</h1>
                <IconBtn onClick={() => dialog.current?.close()} children={<X />} />
            </span>
            <FormUserRegister onSuccess={({ exit }) => Success(exit)} />
        </div>
    )
}

