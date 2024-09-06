import React, { useEffect } from "react";
import { useFieldChanges } from "../../hooks";

export interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelText?: string;
    error?: string;
    classNameContent?: string;
    styleField?: React.CSSProperties;
    leading?: React.ReactElement;
    trailing?: React.ReactElement;
    reference?: React.RefObject<HTMLInputElement>;
}

const Input = ({ labelText, error, styleField, leading, trailing, classNameContent, reference, ...props }: Props) => {
    const { inputRef, floatingLabel, onBlur, onFocus } = useFieldChanges({ reference });
    useEffect(() => {
        console.log(props.value);
        if (props.value && props.value.toString().length > 0) {
            floatingLabel.current?.classList.add('floating-label-top');
        } else {
            if(inputRef.current)
                inputRef.current.value = '';
        }
    }, [floatingLabel, inputRef, props.value])

    return (
        <div className={`realtive ${classNameContent}`}>
            <div style={styleField} className={`relative h-[50px] w-full rounded-lg border border-slate-400`}>
                <label className={`flex h-full items-center ${error ? 'field-error' : ''} ${leading ? 'pl-2' : ''} ${trailing ? 'mr-2' : ''}`}>
                    {leading}
                    <input
                        className={`input text-slate-500 dark:text-slate-400 w-full h-full outline-none bg-transparent rounded-xl px-4 text-lg mt-1  ${leading ? "-ml-3" : ""} ${trailing ? '-mr-7' : ''}`}
                        {...props}
                        ref={inputRef}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        style={{ color: error ? 'var(--error)' : undefined }}
                    />
                    {trailing}
                </label>
                {labelText && <span onClick={() => inputRef.current?.focus()} ref={floatingLabel} className={`text-slate-600 dark:text-slate-300 text-lg absolute left-4 top-[10px] ${leading ? 'ml-5' : ''}`}>{labelText}</span>}
            </div>
            {error && <p className="text-red-500 dark:text-red-400 ml-3 font-medium text-sm">{error}</p>}
        </div>
    )
};

export default Input;
