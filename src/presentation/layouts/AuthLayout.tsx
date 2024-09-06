import { Text } from "../components/Text";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { AuthStatus } from "../../interfaces";
import { bg2 } from "../App";
export const AuthLayout = () => {
  const authStatus = useAuthStore(state => state.status);
  if (authStatus === AuthStatus.authorized) {
    return <Navigate to='/' />;
  }

  return (
    <main className="h-full w-full flex flex-col lg:flex-row">
      <aside className={`${bg2} shadow-lg p-5 lg:w-[400px] flex items-center justify-center`}>
          <Text className="font-semibold" variant="text-3xl">Hello, wellcome back...</Text>
      </aside>
      <section className="flex-1 md:flex justify-center items-center">
        <Outlet />
      </section>
    </main >
  );
};