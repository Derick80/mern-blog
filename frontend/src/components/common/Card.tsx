import { formatDistance } from 'date-fns'
import React, { useContext } from 'react'
import { ProfileProps, User } from '../../additional'
import { AuthContext } from '../../utils/context/auth'
import DeleteButton from '../DeleteButton'
import EditButton from '../EditButton'


export type ProfilePropsX = {
    item: ProfileProps
}
const ProfileContent = (item: ProfileProps) => {
    return (
        <Card profile={ item } />
    )
}

interface CardProps {
    children?: React.ReactNode
    disabled?: boolean
    onClick?: () => void
    onChange?: () => void
    className?: string
    profile: ProfileProps
}


const Card = ({
    profile,
    onClick,
    onChange
}: CardProps): JSX.Element => {
    const { user }: any = useContext(AuthContext)
    return (
        <div className='card-container'>
            <div className='card' key={ profile.id }>
                <div className='card-header'>
                    { <img src={ profile.avatarUrl } alt='bleh' /> }
                </div>

                <div className='card-body'>
                    <div>
                        <label>About Me</label>
                        <p>{ profile.aboutMe }</p>
                    </div>
                    <div>
                        <label>Location</label>
                        <p>{ profile.location }</p>
                    </div>
                    <div>
                        <label>Email</label>
                        <p>{ profile.email }</p>
                    </div>
                    <div>
                        <label>NickName</label>
                        <p>{ profile.nickName }</p>
                    </div>
                </div>
                <div className='card-footer'>
                    { user && user.username === profile.username &&
                        <>
                            <DeleteButton profileId={ profile.id } />
                            <EditButton profileId={ profile.id } />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
export default ProfileContent