import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { AuthStatus } from "../../interfaces";
import { NavBar } from "../components/NavBar";
import { useNavs } from "../../hooks/useNavs";
import { bg2 } from "../App";

interface PropsItem {
    title: string;
    path: string;
    icon?: React.JSX.Element;
}

export const RootLayout = () => {
    const authStatus = useAuthStore(state => state.status);
    const { pathname } = useLocation();
    const { AsideRef, Navs, onClickMenu } = useNavs();
    if (authStatus !== AuthStatus.authorized) {
        return <Navigate replace to='/auth/login' />
    }

    if (pathname === '/') {
        return <Navigate to={'home'} />
    }

    const Item = ({ title, icon, path }: PropsItem) => {
        return (
            <NavLink style={{ textDecoration: 'none' }} to={path} onClick={onClickMenu(AsideRef)}>
                {({ isActive }) =>
                    <li className={`flex gap-3 items-center mb-1 p-2 text-base font-semibold rounded-md transition duration-75 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-300 ${isActive ? 'border-slate-400 text-slate-800 bg-slate-300 border-l-2 dark:bg-slate-700 dark:text-slate-100' : ''} `}>
                        {icon ?? null}
                        <p children={title} />
                    </li>
                }
            </NavLink>
        )
    };

    return (
        <main className="h-full w-full flex flex-col">
            <NavBar reference={AsideRef} />
            <section className="flex-1 flex w-full h-full relative overflow-auto">
                <aside id="menu-sidebar" ref={AsideRef} className={`${bg2} fixed z-10 w-[0px] p-3 hidden lg:relative lg:block lg:w-[300px] h-full transition-transform -translate-x-full lg:-translate-x-0 shadow-lg`}>
                    <ul className="pt-5">
                        {Navs.map(({ validate, ...props }, idx) => validate && <Item key={idx + 1} {...props} />)}
                    </ul>
                </aside>
                <Outlet/>
            </section>
        </main>
    )
}