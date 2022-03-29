import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../utils/hooks/graphql";
import { useForm } from "../utils/hooks/useForm";


export default function Register() {
    let navigate = useNavigate()
    const { handleChange, handleSubmit, values } = useForm(registerUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    function registerUserCallback() {
        register()
    }

    const [register] = useMutation(REGISTER_USER, {
        update(_: any, data) {
            console.log(data)
            navigate('/')
        },
        variables: values


    })


    return (
        <div className="primary-content">

            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>username:</label>
                <input type='text'
                    required
                    name='username'
                    placeholder="your username"
                    autoFocus={true}
                    value={values.username}
                    onChange={handleChange}
                />
                <label>email:</label>
                <input type='text'
                    required
                    name='email'
                    placeholder="your email address"
                    autoFocus={true}
                    value={values.email}
                    onChange={handleChange}
                />
                <label>Password</label>
                <input type='password'
                    required
                    name='password'
                    placeholder="Enter your password"
                    autoFocus={true}
                    value={values.password}
                    onChange={handleChange}
                />
                <label>Confirm Password</label>
                <input type='password'
                    required
                    name='confirmPassword'
                    placeholder="Enter your password"
                    autoFocus={true}
                    value={values.confirmPassword}
                    onChange={handleChange}
                />
                <button type='submit' >
                    Register
                </button>
            </form>

        </div>

    )
}