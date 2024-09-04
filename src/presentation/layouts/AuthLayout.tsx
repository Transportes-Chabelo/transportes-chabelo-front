import { Text } from "../components/Text";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { AuthStatus } from "../../interfaces";

export const AuthLayout = () => {
  const authStatus = useAuthStore(state => state.status);
  if (authStatus === AuthStatus.authorized) {
    return <Navigate to='/' />;
  }

  return (
    <main className="flex h-screen w-screen">
      <aside className=" flex flex-col shadow-lg dark:shadow-slate-600 px-2 bg-slate-50 dark:bg-slate-900 w-0 sm:w-96">
        {/* <img className="size-16 dark:grayscale dark:invert drop-shadow-lg" src={logo} alt="logo" /> */}
        <section className="flex-1 flex flex-col justify-evenly pb-20">
          <Text className="font-semibold" variant="text-3xl">Hello, wellcome back...</Text>
          {/* <img className="w-full dark:grayscale dark:invert drop-shadow-lg" src={logoIso} alt="logoIso" /> */}
        </section>
      </aside>
      <section className="flex-1 flex items-center justify-center">
        <Outlet />
      </section>
    </main >
  );
};