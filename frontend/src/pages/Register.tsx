import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../utils/graphql/graphql";
import { useForm } from "../utils/hooks/hooks";


export default function Register() {
    let navigate = useNavigate()
    const { handleChange, handleSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // const initialState = {
    //     username: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: ''
    // }

    function registerUser() {
        register()
    }

    const [register, { loading }] = useMutation(REGISTER_USER, {
        update(_: any, data) {
            console.log(data)
            navigate('/')
        },
        variables: values


    })


    return (
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
    )
}