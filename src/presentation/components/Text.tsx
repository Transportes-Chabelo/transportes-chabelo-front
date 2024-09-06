import React from "react";
import { TypeScale } from "../interfaces/types";
import { textColor } from "../App";

interface Props {
    children: React.ReactNode;
    variant?: TypeScale;
    style?: React.CSSProperties | undefined;
    className?: string;
}
export const Text = ({ variant = 'text-base', children, style, className }: Props) => {
    return (
        <p className={`${textColor} ${variant} ${className}`} style={style}>{children}</p>
    )
}
