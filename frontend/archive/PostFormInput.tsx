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
}
export default function PostFormInput({
    register,
    name,
    error,
    label,
    wrapperClass,
    value,
    formData,
    ...rest
}: InputProps) {
    return (
        <div className={wrapperClass}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                aria-invalid={error ? "true" : "false"}
                {...register(name)}
                {...rest}
            />
            {error && <span role="alert">{error}</span>}
        </div>
    )
}
