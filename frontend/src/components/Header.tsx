import { Link, NavLink } from "react-router-dom"

import Icon from '@mdi/react'
import { mdiAccount, mdiAccountPlusOutline, mdiLogin, mdiPencilPlusOutline } from '@mdi/js'
import { AuthContext } from "../context/auth"
import { useContext } from "react"

function Header() {

    const { user, logout } = useContext(AuthContext)

    const headerBar = user ? (
        <nav>

            <ul className="left-nav-ul" role="menu"
                aria-labelledby="menubutton">
                <li>
                    <NavLink to="/">Posts Feed</NavLink>
                </li>
                <li>
                    <NavLink to="/create">

                        <Icon className="svg-icon" path={mdiPencilPlusOutline} title="Create" />Create

                    </NavLink>
                </li>
                <li>
                    <NavLink to="/drafts">

                        drafts
                    </NavLink>
                </li>
            </ul>
            <ul className="right-nav-ul">
                <li className="right-li">
                    <NavLink to="/profile">
                        <Icon className="svg-icon" path={mdiAccount} title="Acount" />Acount

                    </NavLink>
                </li>


                <li className="right-li">

                    <button onClick={logout}>
                        logout
                    </button>
                </li>
            </ul>
        </nav>
    ) :
        (
            <nav>

                <ul role="menu"
                    aria-labelledby="menubutton">
                    <li>
                        <NavLink to="/">Posts Feed</NavLink>
                    </li>

                    <li>
                        <NavLink to="/register">
                            <Icon className="svg-icon" path={mdiAccountPlusOutline} title="Register" />Register

                            {/* <span className="mdi mdi-login">LOGIN</span> */}
                        </NavLink>

                    </li>
                    <li>
                        <NavLink to="/login">
                            <Icon className="svg-icon" path={mdiLogin} title="Login" />LOGIN

                        </NavLink>

                    </li>

                </ul>
            </nav>
        )
        ;
    return headerBar

}
export default Header