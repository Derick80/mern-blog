import { Link } from "react-router-dom"

import Icon from '@mdi/react'
import { mdiAccount, mdiLogin, mdiLogout, mdiPencilPlus, mdiPencilPlusOutline } from '@mdi/js'

export default function Header() {
    return (
        <nav>
            <div className="logo">
                <Link to="/">Posts Feed</Link>
            </div>
            <ul className="nav-links" role="menu"
                aria-labelledby="menubutton">
                <li>
                    <Link to="/Create">

                        <Icon className="svg-icon" path={mdiPencilPlusOutline} title="Create" />Create

                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <Icon className="svg-icon" path={mdiAccount} title="Acount" />Acount

                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        <Icon className="svg-icon" path={mdiLogin} title="Login" />LOGIN

                        {/* <span className="mdi mdi-login">LOGIN</span> */}
                    </Link>

                </li>
                <li>

                    <Link to="/logout">                        <Icon className="svg-icon" path={mdiLogout} title="Logout" />LOGOUT
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
