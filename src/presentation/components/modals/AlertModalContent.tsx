import { ReactNode } from "react";
import { X } from "../../icons/icons";
import { ModalContent } from "../../interfaces/interfaces";
import { Button } from "../Button";
import { IconBtn } from "../IconBtn";

interface PropsModal<T> extends ModalContent<T> {
    label: string;
    onlyOk?: boolean;
    type?: "error" | "alert" | "success" | "normal";
    Icon?: ReactNode;
    btnlabelConfirm?: string;
    btnlabelCanel?: string;
}

export const AlertModalContent = <T extends object>({ dialog, onSuccess, label, Icon, type = "normal", btnlabelCanel, btnlabelConfirm, onlyOk }: PropsModal<T>) => {

    const Success = (exit: boolean) => () => {
        onSuccess && onSuccess({ exit });
        dialog.current?.close()
    }

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex">
            <div className="relative bg-slate-200 rounded-xl shadow-lg dark:bg-slate-900 px-4 text-gray-500 dark:text-gray-400">
                <div className="absolute top-3 end-2.5">
                    <IconBtn onClick={Success(false)} className="font-bold" children={<X />} />
                </div>
                <div className="p-4 md:p-5 text-center">
                    {Icon}
                    <h3 className={`mb-5 text-lg ${Icon ? "my-0" : "mt-10"}`}>{label}</h3>
                    {onlyOk
                        ? <Button onClick={Success(false)} children="Ok" />
                        :
                        <>
                            <Button onClick={Success(true)} typeBtn={type} children={btnlabelConfirm ?? "Yes"} />
                            <Button onClick={Success(false)} className="ms-3" children={btnlabelCanel ?? "No"} />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}