import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavs } from '../../hooks/useNavs';

interface PropsItem {
    title: string;
    path: string;
    icon?: React.JSX.Element;
}

const Item = ({ title, icon, path }: PropsItem) => {
    return (
        <NavLink style={{ textDecoration: 'none' }} to={path} onClick={() => document.querySelector("#menu-sidebar")?.classList.toggle("-translate-x-full")}>
            {({ isActive }) =>
                <li className={`flex gap-3 items-center mb-1 p-2 text-base font-semibold rounded-lg transition duration-75 text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-400 ${isActive ? 'border-slate-400 text-slate-800 bg-slate-300 border-l-2 dark:bg-slate-700 dark:text-slate-200' : ''} `}>
                    {icon ?? null}
                    <p children={title} />
                </li>
            }
        </NavLink>
    )
};

export const SideBar = () => {
    const { AsideRef, Navs } = useNavs();
    return (
        <aside id="menu-sidebar" ref={AsideRef} className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full lg:-translate-x-0 bg-slate-50 dark:bg-slate-900 shadow-lg">
            <div className="overflow-y-auto py-5 px-3 h-full">
                <div>

                </div>
                <ul
                    className="pt-5"
                >
                    {Navs.map(({ validate, ...props }, idx) => validate && <Item key={idx + 1} {...props} />)}
                </ul>
            </div>
        </aside >
    )
}
