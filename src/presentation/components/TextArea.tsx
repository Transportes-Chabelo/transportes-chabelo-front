import React, { useEffect } from "react";
import { useFieldTextAreaChanges } from "../../hooks/useFieldChanges";

export interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelText?: string;
    error?: string;
    classNameContent?: string;
    styleField?: React.CSSProperties;
    leading?: React.ReactElement;
    trailing?: React.ReactElement;
    reference?: React.RefObject<HTMLInputElement>;
}

export interface Props2 extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    labelText?: string;
    error?: string;
    classNameContent?: string;
    styleField?: React.CSSProperties;
    leading?: React.ReactElement;
    trailing?: React.ReactElement;
    reference?: React.RefObject<HTMLTextAreaElement>;
}

const TextAreaInput = ({ labelText, error, styleField, leading, trailing, classNameContent, reference, ...props }: Props2) => {
    const { inputRef, floatingLabel, onBlur, onFocus } = useFieldTextAreaChanges({ reference });
    useEffect(() => {
        if(props.value && props.value.toString().length > 0){
            floatingLabel.current?.classList.add('floating-label-top');
        }
    }, [floatingLabel, props.value])
    
    return (
        <div className={`realtive h-full ${classNameContent}`}>
            <div style={styleField} className={`relative w-full h-full rounded-lg border border-slate-400`}>
                <label className={`flex h-full items-center ${error ? 'field-error' : ''} ${leading ? 'pl-2' : ''} ${trailing ? 'mr-2' : ''}`}>
                    {leading}
                    <textarea
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

export default TextAreaInput;
