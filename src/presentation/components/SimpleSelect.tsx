import { useCallback, useRef } from "react";
import { Caret } from "../icons/icons";
import { Text } from "./Text";
import { PropsSelect } from "../interfaces/interfaces";

interface Props<value> {
    selected: string;
    options: Array<PropsSelect<value>>;
    onSelect: (value: PropsSelect<value>) => void;
}

export const SimpleSelect = <T extends Object>({ options, selected, onSelect }: Props<T>) => {
    const select = useRef<HTMLDivElement>(null);
    const dialog = useRef<HTMLDialogElement>(null);

    const onSelectClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const rect = event.currentTarget.getBoundingClientRect();
            console.log(rect);

            if (dialog.current) {
                if (select.current) {
                    // select.current.style.top = `${rect.y - rect.height}px`;
                    select.current.style.left = `${rect.x}px`;
                }
                dialog.current.show();
            }
        },
        [dialog.current, select.current],
    )

    const onSelectPageClick = useCallback(
        (value: PropsSelect<T>) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            dialog.current?.close();
            onSelect && onSelect(value);
        },
        [dialog.current],
    )

    return (
        <span className="relative">
            <div className='flex gap-1 cursor-pointer' onClick={onSelectClick}>
                <span className="Title-small">{selected}</span>
                <Caret />
            </div>
            <dialog ref={dialog}>
                <div ref={select} className='flex flex-col gap-1 fixed rounded-lg p-2 shadow-md dark:shadow-slate-950 bg-slate-200 dark:bg-slate-600'>
                    {options.map(option => <button key={option.label} onClick={onSelectPageClick(option)} children={<Text className="hover:bg-slate-400 dark:hover:bg-slate-800 rounded-lg px-1" children={option.label} />} />)}
                </div>
            </dialog>
        </span>
    )
}
