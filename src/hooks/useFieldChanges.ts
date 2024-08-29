/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

export function useFieldChanges({ reference }: { reference?: React.RefObject<HTMLInputElement> }) {
    const floatingLabel = React.useRef<HTMLSpanElement>(null);
    const inputRef = reference ?? React.useRef<HTMLInputElement>(null);

    React.useLayoutEffect(() => {
        if (inputRef.current?.value.length !== 0) {
            floatingLabel.current?.classList.add('floating-label-top');
        }
    }, [inputRef.current]);

    const onFocus: React.FocusEventHandler<HTMLInputElement> = React.useCallback(() => {
        floatingLabel.current?.classList.add('floating-label-top');
    }, [floatingLabel.current]);

    const onBlur: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
        ({ target: { value } }) => {
            if (value.length === 0) {
                floatingLabel.current?.classList.remove('floating-label-top');
            }
        }, [floatingLabel.current]);

    return {
        floatingLabel,
        inputRef,
        onFocus,
        onBlur,
    }
}
