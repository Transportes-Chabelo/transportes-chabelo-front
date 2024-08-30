import { Control, Path, RegisterOptions } from "react-hook-form";
import { Props } from "../components/Input";
import { Props as SelectProps } from "../components/Select";
type FieldValues = Record<string, any>;

export interface TextFieldProps<T extends FieldValues> extends Props {
    control: Control<T, any>;
    name: Path<T>;
    rules?: Omit<RegisterOptions<T, Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined;
}

export interface SelecFieldProps<T extends FieldValues> extends SelectProps {
    control: Control<T, any>;
    name: Path<T>;
    rules?: Omit<RegisterOptions<T, Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined;
}

export interface ModalContent<T> extends PropsForm<T> {
    dialog: React.RefObject<HTMLDialogElement>;
    rect?: DOMRect;
}

export interface PropsForm<T> {
    onSuccess?: (value: { exit: boolean, value?: T }) => void;
}

/**Data-table */

export interface PropsSelect<T> {
    label: string;
    value: T;
}

export interface Key<T> {
    key: keyof T | Array<keyof T>;
    wildcard: string;
    key2?: string;
    title?: string;
    style?: React.CSSProperties;
}

export interface PropsDataTable<T> {
    title: string;
    data: Array<T>;
    id: keyof T;
    keys: Array<Key<T>>;
    indices?: boolean;
}