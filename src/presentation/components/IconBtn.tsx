import React from 'react'

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const IconBtn = ({ children, className, ...props }: Props) => {
    return (
        <button className={`hover:bg-slate-400 hover:shadow-sm hover:shadow-slate-500 dark:hover:bg-slate-600 rounded-full p-[5px] dark:hover:shadow-sm dark:hover:shadow-slate-500 disabled:opacity-50 transition-all ${className}`} {...props}>{children}</button>
    )
}
