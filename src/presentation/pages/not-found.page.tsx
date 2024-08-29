import { Text } from "../components/Text"
import { Navigate, useNavigate } from "react-router-dom";
import Img from '../assets/404.gif';
import { useAuthStore } from "../../stores";
import { AuthStatus } from "../../interfaces";

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const authStatus = useAuthStore(state => state.status);
    if (authStatus !== AuthStatus.authorized) {
        return <Navigate replace to='/auth/login' />
    }
    const handleClick = () => {
        navigate("/", { replace: true })
    }
    return (
        <main className="full-flex container-not-found">
            <img src={Img} alt="404" />
            <Text className="text-color error">404</Text>
            <Text className="text-color paragraph">Página no encontrada</Text>
            <button onClick={handleClick} className="button">Ir a Inicio</button>
        </main>
    )
};