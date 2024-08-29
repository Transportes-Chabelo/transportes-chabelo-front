import React from 'react'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

export const IconBtn = ({ children, className, ...props }: Props) => {
    return (
        <button className={`bg-slate-300 hover:bg-slate-400 hover:shadow-sm hover:shadow-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-[2px] dark:hover:shadow-sm dark:hover:shadow-slate-500 disabled:opacity-50 transition-all ${className}`} {...props}>{children}</button>
    )
}
