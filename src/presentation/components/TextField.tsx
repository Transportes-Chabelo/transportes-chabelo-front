import { Controller } from "react-hook-form"
import { TextFieldProps } from "../interfaces/interfaces"
import Input from "./Input"
import TextAreaInput from "./TextArea"

export const TextField = <T extends object>({ control, name, labelText, rules, ...props }: TextFieldProps<T>) => {
    return (
        <Controller
            control={control}
            rules={rules}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                    {...props}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    labelText={labelText}
                    error={error ? error.message : undefined}
                    name={name}
                />
            )}
        />
    )
}

export const TextArea = <T extends object>({ control, name,  rules }: TextFieldProps<T>) => {
    return (
        <Controller
            control={control}
            rules={rules}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <TextAreaInput
                    // {...props}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    // labelText={labelText}
                    error={error ? error.message : undefined}
                    name={name}
                />
            )}
        />
    )
}
