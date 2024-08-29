import { toast } from "sonner";
import { ErrorResponse } from "../interfaces";
import { useAuthStore } from "../stores";
import { AxiosError } from "axios";

export function useHandleError() {
    const logOut = useAuthStore(state => state.logOut);
    const Message = (responseError: unknown) => {
        const err = ((responseError as AxiosError).response?.data as ErrorResponse).message;
        return Array.isArray(err) ? err[0] : err;
    }
    const showError = ({ responseError, exit }: { responseError: unknown, exit?: boolean }) => {
        try {
            const { error, message, statusCode } = (responseError as AxiosError).response?.data as ErrorResponse;
            if (exit && statusCode === 401) logOut();
            return toast.error(Array.isArray(message) ? message[0] : message, { description: error });
        } catch (error) {
            toast.error(`Error`, { description: `${error}` });
        }
    }

    return { showError, logOut, Message }
}