import { devtools, persist } from "zustand/middleware";
import { AuthState, AuthStatus, User } from "../interfaces";
import { StateCreator, create } from "zustand";

const storeApi: StateCreator<AuthState> = (set) => ({

    status: AuthStatus.pending,
    token: undefined,
    user: undefined,

    logIn: (user: User, token: string) => set((state) => ({ ...state, user: user, status: AuthStatus.authorized, token })),
    updateStatus: (status) => set({ status }),
    logOut: () => {
        set((state) => ({ ...state, user: undefined, token: undefined, status: AuthStatus.unauthorized }))
    },

});

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi,
            { name: "AuthStore" }
        )
    )
)