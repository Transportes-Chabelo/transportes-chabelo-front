import avatar from '../assets/avatar.jpg';
import { Menu, Moon, Sun } from '../icons/icons';
import { useTopMenu } from '../../hooks/useTopMenu';
import { useThemeStore } from '../../stores';
import { ThemeMode } from '../../interfaces';
import { useCallback } from 'react';
import { bg2, textColor } from '../App';
import { Text } from './Text';
import { IconBtn } from './IconBtn';
import { useNavs } from '../../hooks/useNavs';

interface Props {
    reference?: React.RefObject<HTMLElement>;
}

export const NavBar = ({ reference }: Props) => {
    const { Toggle_User_Dropdown, User_Dropdown_ref, user, LogOut } = useTopMenu();
    const updateMode = useThemeStore(store => store.updateMode);
    const mode = useThemeStore(store => store.mode);
    const { onClickMenu } = useNavs();

    const Avatar = () => (
        <button onClick={Toggle_User_Dropdown} className="flex text-sm s rounded-full md:me-0">
            <img className="w-9 h-9 rounded-full" src={avatar} alt="user photo" />
        </button>
    )

    const UserDropdown = useCallback(
        () => (
            <div ref={User_Dropdown_ref} className="hidden absolute z-50  w-[200px] top-7 right-4 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3">
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user?.userName}</span>
                    <span className="block text-sm text-gray-900 dark:text-white">{user?.fullName}</span>
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
        <nav className={`${bg2}fixed left-0 right-0 top-0 z-50`}>
            <div className="flex flex-wrap items-center justify-end md:justify-between mx-auto p-4">
                <Text children="EMPRESA Dispositivos" className='font-semibold' variant='text-2xl' />
                <div className="relative flex items-center gap-3">
                    {mode === ThemeMode.light ? <IconBtn children={<Moon className={textColor} />} onClick={() => updateMode(ThemeMode.dark)} /> : <IconBtn children={<Sun className={textColor} />} onClick={() => updateMode(ThemeMode.light)} />}
                    <Avatar />
                    <UserDropdown />
                    <IconBtn className='lg:hidden' children={<Menu className={textColor} />} onClick={onClickMenu(reference)} />
                </div>
            </div>
        </nav>

    )
}
