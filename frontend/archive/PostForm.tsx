import React, { createElement, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { CreatePostFormValues, FormValues } from '../src/additional'
import Button from '../src/components/common/Button';




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


}

export default function PostForm({ defaultValues, children, onSubmit, buttonLabel, formData, name, ...rest }: FormProps) {
    const { register, handleSubmit } = useForm<CreatePostFormValues>()

    return (
        <form onSubmit={handleSubmit(onSubmit)} {...rest}>
            <div className="d-flex justify-content-center fields__email">
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
