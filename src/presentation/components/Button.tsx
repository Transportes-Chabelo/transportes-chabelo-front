import React from "react";
import { Spinner } from "../icons/icons";

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    full?: boolean;
    loading?: boolean;
    typeBtn?: 'error' | 'alert' | 'success' | 'normal';
}

export const Button = ({ children, className, full = true, loading = false, typeBtn = 'normal', ...props }: Props) => {
    const color = typeBtn === 'normal' ? "bg-slate-700  hover:bg-slate-800 dark:hover:bg-slate-600 dark:hover:shadow-slate-500"
        : typeBtn === 'error' ? "bg-red-700  hover:bg-red-800 dark:hover:bg-red-600 dark:hover:shadow-red-500"
            : typeBtn === 'alert' ? "bg-blue-700  hover:bg-blue-800 dark:hover:bg-blue-600 dark:hover:shadow-blue-500"
                : "bg-green-700  hover:bg-green-800 dark:hover:bg-green-600 dark:hover:shadow-green-500";
    return (
        <button
            className={`h-10 rounded-lg font-medium dark:hover:shadow-sm hover:shadow-md text-slate-200 hover:text-slate-50 transition-all duration-100 px-4 ${full ? "w-auto" : "w-max min-w-24"} ${color} ${className}`}
            {...props}
            disabled={loading}
        >
            {loading ? <Spinner classname="animate-spin mx-auto" /> : children}
        </button>
    )
}
