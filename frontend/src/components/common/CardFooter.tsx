import React, { useState } from 'react'
import { PostFeedProps } from '../../additional'
import DeleteButton from '../DeleteButton'
import EditButton from '../EditButton'
import Button from './Button'


export type CardFooterProps = {
    children?: React.ReactNode
    disabled?: boolean
    onClick?: () => void
    onChange?: () => void
    className?: string
    props?: unknown
    id: string
}
export default function CardFooter ({ id }: CardFooterProps) {
    const [isMine, setIsMine] = useState(false)

    const handleMe = () => {
        setIsMine(!isMine)
    }
    const myMenu = isMine ? (

        <ul>

            <Button className='btn-card-action' onClick={ handleMe } >

                <span className="material-icons">more_vert</span>
                <li>Edit or Delete your Post </li>
                <li>
                    <DeleteButton postId={ id } />
                </li>
                <li>
                    <EditButton postId={ id } ></EditButton>
                </li>


            </Button> </ul>
    ) : (<Button className='btn-card-action' onClick={ handleMe } >
        <span className="material-icons">more_vert</span>

    </Button>
    )

    return (
        <div className='card-footer-menu'>
            { myMenu }</div>
    )
}


