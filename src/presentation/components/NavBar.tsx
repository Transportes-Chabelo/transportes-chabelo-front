import avatar from '../assets/avatar.jpg';
import logo from '../assets/pem-logo.png';
import { Menu, Moon, Sun } from '../icons/icons';
import { useTopMenu } from '../../hooks/useTopMenu';
import { useThemeStore } from '../../stores';
import { ThemeMode } from '../../interfaces';
import { useCallback } from 'react';

export const NavBar = () => {
    const { Toggle_User_Dropdown, User_Dropdown_ref, user, LogOut } = useTopMenu();
    const updateMode = useThemeStore(store => store.updateMode);
    const mode = useThemeStore(store => store.mode);

    const ToggleTheme = useCallback(
        () =>
            <span className='flex'>
                {
                    mode === ThemeMode.light
                        ?
                        <button className='text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 p-1 rounded-lg' onClick={() => updateMode(ThemeMode.dark)}>
                            <Moon />
                        </button>
                        :
                        <button className='text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 p-1 rounded-lg' onClick={() => updateMode(ThemeMode.light)}>
                            <Sun />
                        </button>
                }
            </span>
        ,
        [mode, updateMode],
    )

    const Avatar = () => (
        <button onClick={Toggle_User_Dropdown} className="flex text-sm s rounded-full md:me-0 focus:ring-8 focus:ring-gray-400 dark:focus:ring-gray-600">
            <span className="sr-only">Open user menu</span>
            <img className="w-9 h-9 rounded-full" src={avatar} alt="user photo" />
        </button>
    )

    const UserDropdown = useCallback(
        () => (
            <div ref={User_Dropdown_ref} className="hidden absolute z-50 w-40 top-7 right-4 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">

                <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{user?.fullName}</span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user?.userName}</span>
                </div>

                <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Change password</a>
                    </li>
                    <li>
                        <a onClick={() => {
                            Toggle_User_Dropdown();
                            LogOut();
                        }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </li>
                </ul>
            </div>
        ),
        [LogOut, Toggle_User_Dropdown, User_Dropdown_ref, user?.fullName, user?.userName],
    )




    return (
        <nav className="bg-slate-50 dark:bg-slate-900 fixed left-0 right-0 top-0 z-50 transition-colors">
            <div className="flex flex-wrap items-center justify-end sm:justify-between mx-auto p-4">
                <a href="https://pem-sa.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="dark:grayscale dark:invert h-9 drop-shadow-lg rounded-full" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-600 dark:text-slate-300">PEMSA Monitoreo</span>
                </a>
                <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3">
                    <ToggleTheme />
                    <Avatar />
                    <UserDropdown />
                    <button className='lg:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 p-1 rounded-lg' onClick={() => document.querySelector("#menu-sidebar")?.classList.toggle("-translate-x-full")}>
                        <Menu />
                    </button>
                </div>
            </div>
        </nav>

    )
}
