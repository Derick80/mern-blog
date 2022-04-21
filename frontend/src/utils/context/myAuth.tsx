import { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

export interface UserData {
  user: null
  token: string | null
}
export interface IState {
  user: null
  login: (UserData: UserData) => void
  logout: () => void
}

export interface MyToken {
  user: string
  token: string | null
  exp: number
}

const initialState = {
  user: '',
  token: ''
}

if (localStorage.getItem('jwtToken')) {
  const decodedToken: MyToken = jwtDecode(localStorage.getItem('jwtToken') || '')

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = decodedToken.user
  }
}

const AuthContext = createContext<IState>({
  user: null,
  login: (userData: UserData) => userData,
  logout: () => { },

})

function authReducer (state: typeof initialState, action: any) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

function AuthProvider (props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  function login (userData: any) {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData
    })

  }

  function logout () {
    localStorage.removeItem('jwtToken')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={ { user: state.user, login, logout } }
      { ...props }
    />
  )
}

export { AuthContext, AuthProvider }
