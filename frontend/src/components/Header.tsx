import { Link, useNavigate } from "react-router-dom"

import Icon from '@mdi/react'
import { mdiAccount, mdiAccountPlusOutline, mdiLogin, mdiPencilPlusOutline } from '@mdi/js'
import { AuthContext } from "../context/auth"
import { useContext } from "react"

function Header() {
    let navigate = useNavigate()

    const { user, logout } = useContext(AuthContext)

    const headerBar = user ? (
        <nav>
            <div className="logo">
                <Link to="/">Posts Feed</Link>
            </div>
            <ul className="nav-links" role="menu"
                aria-labelledby="menubutton">
                <li>
                    <Link to="/create">

                        <Icon className="svg-icon" path={mdiPencilPlusOutline} title="Create" />Create

                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <Icon className="svg-icon" path={mdiAccount} title="Acount" />Acount

                    </Link>
                </li>


                <li>

                    <button onClick={logout}>
                        logout
                    </button>
                </li>
            </ul>
        </nav>
    ) :
        (
            <nav>
                <div className="logo">
                    <Link to="/">Posts Feed</Link>
                </div>
                <ul className="nav-links" role="menu"
                    aria-labelledby="menubutton">


                    <li>
                        <Link to="/register">
                            <Icon className="svg-icon" path={mdiAccountPlusOutline} title="Register" />Register

                            {/* <span className="mdi mdi-login">LOGIN</span> */}
                        </Link>

                    </li>
                    <li>
                        <Link to="/login">
                            <Icon className="svg-icon" path={mdiLogin} title="Login" />LOGIN

                        </Link>

                    </li>

                </ul>
            </nav>
        )
        ;
    return headerBar

}
export default Header