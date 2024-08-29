import { StateCreator, create } from "zustand";
import { ThemeMode, ThemeState } from "../interfaces";
import { Colors } from "../config/colors";
import { devtools, persist, } from "zustand/middleware";


const storeApi: StateCreator<ThemeState> = (set) => ({
    colors: Colors,
    mode: ThemeMode.system,

    updateMode: (mode) => set({ mode }),
    updateColor: (color) => set((state) => ({
        ...state,
        colors: { ...state.colors, ['primary']: color }
    })),
});

export const useThemeStore = create<ThemeState>()(
    devtools(
        persist(
            storeApi,
            { name: 'ThemeStorage' }
        )
    )
);