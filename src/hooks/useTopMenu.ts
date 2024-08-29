import { useRef } from 'react';
import { useAuthStore, useThemeStore } from "../stores";
export function useTopMenu() {
    const LogOut = useAuthStore(state => state.logOut);
    const user = useAuthStore(state => state.user);
    const updateMode = useThemeStore(store => store.updateMode);
    const mode = useThemeStore(store => store.mode);

    const User_Dropdown_ref = useRef<HTMLDivElement>(null);

    const Toggle_User_Dropdown = () => {
        User_Dropdown_ref.current?.classList.toggle("hidden");
    }

    return { user, LogOut, updateMode, mode, User_Dropdown_ref, Toggle_User_Dropdown }
}