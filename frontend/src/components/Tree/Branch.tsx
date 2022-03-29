import { ReactNode } from "react";
import Base from "./Base";



export interface Props {
    children?: ReactNode
    onToggle?: () => void
}

export default function List({ children, onToggle, ...props }: Props) {
    return (
        <>
            {children && <button onClick={onToggle}>Toggle</button>}
        </>
    )
}