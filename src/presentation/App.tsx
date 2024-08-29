import { useSetColors } from "../hooks/useSetColors";
import { RouterProvider } from "react-router-dom";
import { router } from "../router/router";
import { Loader } from "./components/Loader";
import { useCheckAuth } from "../hooks";

export const App = () => {
  useSetColors();
  const { isLoading, isFetching } = useCheckAuth();
  return (
    <section className="bg-slate-100 dark:bg-slate-800 h-screen w-screen transition-colors duration-100">
      {(isLoading || isFetching) ? <Loader text="Checking..." /> : <RouterProvider router={router} />}
    </section>
  )
}