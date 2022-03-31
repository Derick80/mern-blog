import React, { createElement, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { CreatePostFormValues } from '../../../additional';
import Button from '../Button';




type FormProps = {
    defaultValues?: any;
    children?: ReactNode;
    buttonLabel?: string;
    onSubmit?: any;
    handleSubmit?: any;
    register?: any;
    className?: string;
    formData?: any,
    name?: any
    handleInputChange?: any
    handlePictureChange?: any
    initialValues?: any


}

export default function Form({ defaultValues, children, onSubmit, buttonLabel, formData, name, className, initialValues, ...rest }: FormProps) {
    const { register, handleSubmit } = useForm<CreatePostFormValues>()

    return (
        <form onSubmit={handleSubmit(onSubmit)} {...rest}>
            <div className={className}>
                {Array.isArray(children)
                    ? children.map((child) => {
                        return child.props.name
                            ? createElement(child.type, {
                                ...{
                                    ...child.props,
                                    register,
                                    key: child.props.name
                                }
                            })
                            : child;
                    })
                    : children}
            </div>
            <Button className="btn btn--brand">{buttonLabel}</Button>
        </form>
    )
}
