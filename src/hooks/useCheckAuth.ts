import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import { useAuthStore } from "../stores";
import { AuthStatus } from "../interfaces";
import { useEffect } from "react";
import { toast } from "sonner";

export function useCheckAuth() {
    const token = useAuthStore(state => state.token);
    const status = useAuthStore(state => state.status);
    const logOut = useAuthStore(state => state.logOut);
    const logIn = useAuthStore(state => state.logIn);
    const req = useQuery({
        queryKey: ['checkStatus'],
        queryFn: AuthService.checkStatus,
        enabled: (!!token && status === AuthStatus.pending),
        retry: 1,
    });

    useEffect(() => {
        if (req.error) {
            toast.error(`${req.error}`);
            logOut();
        }
        if (req.data) {
            const { token, ...rest } = req.data;
            logIn(rest, token);
        }
    }, [req.error, req.data, logOut, logIn]);

    return req;
}
