import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { useAuthStore } from "../../stores";
import { AuthStatus } from "../../interfaces";
import { NavBar } from "../components/NavBar";

export const RootLayout = () => {
    const authStatus = useAuthStore(state => state.status);
    const { pathname } = useLocation();
    if (authStatus !== AuthStatus.authorized) {
        return <Navigate replace to='/auth/login' />
    }

    if (pathname === '/') {
        return <Navigate to={'home'} />
    }

    return (
        <>
            <NavBar />
            <SideBar />
            <main className="p-4 lg:ml-64 pt-20 h-full flex-1 flex flex-col text-slate-700 dark:text-slate-300">
                <Outlet />
            </main>
        </>
    )
}