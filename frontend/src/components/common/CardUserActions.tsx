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
export default function CardUserActions ({ id }: CardFooterProps) {
    const [expandedMenu, setExpandedMenu] = useState(false)

    const expandMenu = () => {
        setExpandedMenu(!expandedMenu)
    }
    const myMenu = expandedMenu ? (

        <div className="card-list">

            <Button className='btn-icon' onClick={ expandMenu } >

                <span className="material-icons">more_vert</span>

                <div className="card-list-options">
                    Edit or Delete your Post
                    <div className="card-list-button-options">

                        <EditButton postId={ id } />

                        <DeleteButton postId={ id } />
                    </div>

                </div>







            </Button> </div>
    ) : (<Button className='btn-icon' onClick={ expandMenu } >
        <span className="material-icons">more_vert</span>

    </Button>
    )

    return (
        <>
            { myMenu }</>
    )
}


