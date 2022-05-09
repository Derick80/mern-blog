import React, { InputHTMLAttributes } from 'react'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    error?: string;
    register?: any;
    wrapperClass?: string;
    className?: string;
    value?: any;
    formData?: any
    defaultValue?: any
    ref?: any
    hidden?: boolean
    rows?: string
    autoFocus?: boolean
    onChange?: (...args: any) => any,

}
export default function FormInput ({
    register,
    name,
    error,
    label,
    wrapperClass,
    value,
    formData,
    defaultValue,
    hidden,
    rows,
    className,
    autoFocus,
    onChange = () => { },
    ...rest
}: InputProps) {
    return (
        <>
            { label && <label htmlFor={ name }>{ label }</label> }
            <input
                className={ className }
                aria-invalid={ error ? "true" : "false" }
                { ...register(name) }
                autoFocus={ true }
                { ...rest }
            />
            { error && <span role="alert">{ error }</span> }
        </>
    )
}
