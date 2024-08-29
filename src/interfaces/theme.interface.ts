import { ThemeMode } from ".";

export interface ThemeColors {
    primary: string;
    surface: string;
    onSurface: string;
    outline: string;
    error: string;
}

export interface ThemeActions {
    updateMode: (mode: ThemeMode) => void;
    updateColor: (primary: string) => void;
}

export interface ThemeState extends ThemeActions {
    colors: ThemeColors;
    mode: ThemeMode;
}