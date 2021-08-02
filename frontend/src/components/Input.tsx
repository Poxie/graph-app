import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import './Input.css'

interface Props {
    placeholder?: string;
    onSubmit?: (value: string) => void;
    onChange?: (value: string) => void;
    disabled?: boolean;
    defaultValue?: string;
    replaceString?: [string, string];
    noCaps?: boolean;
    noSubmit?: boolean;
    defaultFocus?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = ({ placeholder, onSubmit, onChange, disabled, defaultValue, replaceString, noCaps, noSubmit, defaultFocus, onFocus, onBlur, onKeyPress }) => {
    const [value, setValue] = useState(defaultValue || '');
    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!value || noSubmit) return;
        if(onSubmit) onSubmit(value);
        setValue('');
    };

    const handleChange = useMemo(() => (value: string) => {
        let tempValue = value;
        if(replaceString) tempValue = tempValue.replaceAll(replaceString[0], replaceString[1]);
        if(noCaps) tempValue = tempValue.toLowerCase();
        if(onChange) onChange(tempValue);
        setValue(tempValue);
    }, []);

    const handleKeyPress = useMemo(() => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyPress) return;
        onKeyPress(e);
    }, []);

    useEffect(() => {
        if(defaultFocus) {
            ref.current?.focus();
        }
    }, []);

    return(
        <form className="input" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyPress}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={ref}
            />
        </form>
    )
};