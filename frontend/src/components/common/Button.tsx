import React from 'react'
interface Props {
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    onChange?: () => void
    className?: string
    id?: string
    role?: string

    type?: string

}

export default function Button ({ onClick, className, children, ...props }: Props) {
    return (
        <button className={ className } onClick={ onClick }>
            { children }

        </button>
    )
}
