import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../utils/graphql/graphql";
import { useForm } from "../utils/hooks/hooks"

export default function Login() {
    let navigate = useNavigate()
    const context = useContext(AuthContext)

    const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: '',
    })

    function loginUserCallback() {
        loginUser()
    }

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { login: userData } }) {
            console.log(userData);
            context.login(userData)
            navigate('/')
        },
        variables: values

    })



    return (
        <form className="form-container" onSubmit={handleSubmit} >
            <h1>Login</h1>
            <label>username:</label>
            <input type='text'
                required
                name="username"
                placeholder="your username"
                autoFocus={true}
                value={values.username}
                onChange={handleChange}
            />

            <label>Password</label>
            <input type='password'
                required
                name="password"
                placeholder="Enter your password"
                autoFocus={true}
                value={values.password}
                onChange={handleChange}
            />

            <button type='submit' >
                login
            </button>
        </form>
    )
}