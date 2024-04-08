import React from "react";
import { useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../styles/LoginRegisterPage.css"
import {login} from "../auth/auth";


const LoginPage = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [loginError, setLoginError] = useState()

    const navigate = useNavigate()

    async function handleLogin() {
        setEmailError('')
        setPasswordError('')

        if ('' === email) {
            setEmailError('Please enter your email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email')
            return
        }

        if ('' === password) {
            setPasswordError('Please enter a password')
            return
        }

        try {
            const res = await login({"email": email, "password": password});
            setEmail();
            setPassword();
            navigate("/")
        } catch (error) {
            setLoginError("Login Failed")
        }
    }

    return(
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            <form className="Input-Form">
                <label className="errorLabel">{loginError}</label>
                <div className="InputContainer">
                    <input type="email"
                           placeholder="Enter your email here"
                           value={email}
                           onChange={(ev) => setEmail(ev.target.value)}
                           className="inputBox"
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br/>

                <div className="InputContainer">
                    <input type="password"
                           placeholder="Enter your password here"
                           value={password}
                           onChange={(ev) => setPassword(ev.target.value)}
                           className="inputBox"
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br/>

                <div className="InputContainer">
                    <input className={'inputButton'} type="button" onClick={handleLogin} value={'Log in'}/>
                </div>
            </form>
            <div>
                Not registered yet?
                <Link to="../register">
                    Register
                </Link>
            </div>
        </div>
    )
}
export default LoginPage