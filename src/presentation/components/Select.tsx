import React from "react";
import { Text } from "./Text";
import SelectInput, { Props as PropsSelect } from "react-select";
import { useFieldChanges } from "../../hooks";

export interface Props extends PropsSelect {
    error?: string;
    styleContent?: React.CSSProperties;
    styleField?: React.CSSProperties;
    leading?: React.ReactElement;
}

const Select = ({ error, styleContent, styleField, leading, ...props }: Props) => {
    const { onBlur, onFocus } = useFieldChanges({});
    return (
        <div style={styleContent} className="input-container">
            <label style={styleField} className={`field-container`}>
                <label style={{ padding: '0 5px' }} className={`field ${error ? 'field-error' : ''} ${leading ? 'field-leading' : ''}`}>
                    {leading}
                    <SelectInput
                        {...props}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </label>
            </label>
            {error && <Text className="text-error">{error}</Text>}
        </div>
    )
};

export default Select;
