import { NavLink } from 'react-router-dom'

import { AuthContext } from '../utils/context/auth'
import { useContext } from 'react'

function Header() {
    const { user, logout } = useContext(AuthContext)

    const headerBar = user ? (
        <nav>
            <ul className='left-nav-ul' role='menu' aria-labelledby='menubutton'>
                <li>
                    <NavLink to='/'>Posts Feed</NavLink>
                </li>
                <li>
                    <NavLink to='/create'>Create</NavLink>
                </li>

                <li>
                    <NavLink to='/drafts'>drafts</NavLink>
                </li>
            </ul>
            <ul className='right-nav-ul'>
                <li className='right-li'>
                    <NavLink to='/profile'>Acount</NavLink>
                </li>

                <li className='right-li'>
                    <button onClick={logout}>logout</button>
                </li>
            </ul>
        </nav>
    ) : (
        <nav>
            <ul className='left-nav-ul' role='menu' aria-labelledby='menubutton'>
                <li>
                    <NavLink to='/'>Posts Feed</NavLink>
                </li>

                <li>
                    <NavLink to='/register'>Register</NavLink>
                </li>
                <li>
                    <NavLink to='/login'>LOGIN</NavLink>
                </li>
            </ul>
        </nav>
    )
    return headerBar
}
export default Header
