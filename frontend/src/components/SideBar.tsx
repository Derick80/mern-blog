import { NavLink } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../utils/context/auth'
import Tree from './Tree'

function SideBar() {
    const { user, logout } = useContext(AuthContext)


    const userSideBar = user ? (
        <div className='sidebar'>
            <Tree />
            <ul role='menu' aria-labelledby='menubutton'>

                <li>
                    <NavLink to='/drafts'>drafts</NavLink>
                </li>
            </ul>
            <ul >
                <li >
                    <NavLink to='/profile'>Acount</NavLink>
                </li>

                <li >
                    <button onClick={logout}>logout</button>
                </li>
            </ul>
        </div>
    ) : (
        <div className='sidebar'>
            <ul role='menu' aria-labelledby='menubutton'>


                <li>
                    <NavLink to='/register'>Register</NavLink>
                </li>
                <li>
                    <NavLink to='/login'>LOGIN</NavLink>
                </li>
            </ul>
        </div>
    )
    return userSideBar
}
export default SideBar
