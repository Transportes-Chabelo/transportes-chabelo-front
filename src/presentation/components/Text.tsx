import React from "react";
import { TypeScale } from "../interfaces/types";

interface Props {
    children: React.ReactNode;
    variant?: TypeScale;
    style?: React.CSSProperties | undefined;
    className?: string;
}
export const Text = ({ variant = 'text-base', children, style, className }: Props) => {
    return (
        <p className={`text-slate-600 dark:text-slate-300 ${variant} ${className}`} style={style}>{children}</p>
    )
}
