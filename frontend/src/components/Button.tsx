import React from 'react'




interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    onChange?: React.FormEventHandler<HTMLInputElement>;

}



export default function Button({ onClick, children }: Props) {
    return (
        <button>
            {children}

        </button>
    )
}
