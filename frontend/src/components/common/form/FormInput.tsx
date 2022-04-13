import React, { InputHTMLAttributes } from 'react'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    error?: string;
    register?: any;
    wrapperClass?: string;
    className?: string;
    value?: string;
    formData?: any
    defaultValue?: any
    ref?: any
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
    ...rest
}: InputProps) {
    return (
        <div className={ wrapperClass }>
            { label && <label htmlFor={ name }>{ label }</label> }
            <input
                aria-invalid={ error ? "true" : "false" }
                { ...register(name) }
                { ...rest }
            />
            { error && <span role="alert">{ error }</span> }
        </div>
    )
}
