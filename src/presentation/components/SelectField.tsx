import { Controller } from "react-hook-form"
import { SelecFieldProps } from '../interfaces/interfaces'; import Select from "./Select";

export const SelectField = <T extends object>({ control, name, ...props }: SelecFieldProps<T>) => {
    return (
        <Controller
            control={control}
            rules={{
                required: { value: true, message: 'field is required' },
            }}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (
                    <Select
                        {...props}
                        unstyled
                        styleContent={{ flex: 1 }}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value ?? ''}
                        error={error ? error.message : undefined}
                        name={name}
                        defaultValue={undefined}
                        hideSelectedOptions
                        isClearable
                        classNames={{
                            control: ({ isFocused }) => `${isFocused ? "" : ""} px-4 h-full bg-transparent`,
                            container: () => "h-[50px] w-full rounded-xl border border-slate-400 text-slate-500 dark:text-slate-400 text-lg",
                            indicatorSeparator: ({ hasValue }) => `h-1/2 my-auto mx-1 ${hasValue ? "border border-current" : "hidden"}`,
                            menu: () => "mt-2 p-2 bg-slate-100 dark:bg-slate-600 shadow-lg rounded-xl border border-slate-400",
                            option: ({ isFocused }) => `my-2 px-2 py-1 rounded-md ${isFocused && "bg-slate-200 dark:bg-slate-700 shadow-sm"}`,
                        }}
                    />
                )
            }}
        />
    )
}
