import React from 'react'
import { createPortal } from 'react-dom'

interface Props extends Omit<
    React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>, 'style' | 'ref'> {
    refElement: React.RefObject<HTMLDialogElement>;
    onClosed?: (close: boolean) => void;
}

export const Portal = ({ children, onClosed, refElement, ...props }: Props) => {
    const Element = document.getElementById('show-modal') ?? document.body;

    return (
        createPortal(
            <dialog className="bg-[#00000030] dark:bg-[#dedede30] h-full w-full z-50 top-0 left-0 overflow-hidden text-slate-700 dark:text-slate-300" {...props} ref={refElement}>
                <div className="h-full w-full flex justify-center items-center">
                    <div className="h-full w-full" onClick={() => onClosed && onClosed(true)} />
                    <div className="absolute">
                        {children}
                    </div>
                </div>
            </dialog>,
            Element
        )
    )
}