import { useSetColors } from "../hooks/useSetColors";
import { RouterProvider } from "react-router-dom";
import { router } from "../router/router";
import { Loader } from "./components/Loader";
import { useCheckAuth } from "../hooks";
import { useGroupDevice } from "../hooks/useDeviceGroup";

export const App = () => {
  useSetColors();
  const { isLoading, isFetching } = useCheckAuth();
  useGroupDevice();
  return (
    <section className={`${bg} h-screen w-screen`}>
      {(isLoading || isFetching) ? <Loader text="Checking..." /> : <RouterProvider router={router} />}
    </section>
  )
}

const transition: string = "transition-colors duration-100";
export const bg: string = `bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 ${transition}`;
export const bg2: string = `bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 ${transition}`;
export const textColor: string = `text-slate-600 dark:text-slate-300 text-slate-700 dark:text-slate-300 ${transition}`;