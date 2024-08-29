import { AuthStatus, TypeUser } from ".";

export interface User {
    id: string;
    fullName: string;
    userName: string;
    role: TypeUser;
    isActive: boolean;
}

export interface AuthActions {
    logIn: (user: User, token: string) => void;
    updateStatus: (status: AuthStatus) => void;
    logOut: () => void;
}

export interface AuthState extends AuthActions {
    status: AuthStatus;
    token?: string;
    user?: User;
}