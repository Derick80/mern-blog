import { REGISTER_USER } from "../utils/graphql/graphql"

export default function Login() {
    return (
        <div className="login-form">
            <h1>Login</h1>
            <label>username:</label>
            <input type='text'
                required
                placeholder="your username"
                autoFocus={true}
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            />
            <label>email:</label>
            <input type='text'
                required
                placeholder="your email address"
                autoFocus={true}
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            />
            <label>Password</label>
            <input type='password'
                required
                placeholder="Enter your password"
                autoFocus={true}
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            />
            <button type='submit'>
                login
            </button>
        </div>
    )
}