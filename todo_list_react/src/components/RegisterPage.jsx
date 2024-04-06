import React from "react";
import { useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setToken} from "./Auth";
import "../styles/LoginRegisterPage.css"
import {login, register} from "../auth/auth";


const RegisterPage = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [registerError, setRegisterError] = useState()

    const navigate = useNavigate()

    async function handleRegister() {
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
            const res = await register({"email": email, "password": password});
            setEmail();
            setPassword();
            navigate("/")
            return;
        } catch (error) {
            setRegisterError(error.response.data.detail)
        }

    }

    return(
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Registration</div>
            </div>
            <form className="Input-Form">
                <label className="errorLabel">{registerError}</label>
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
                    <input className={'inputButton'} type="button" onClick={handleRegister} value={'Registration'}/>
                </div>
            </form>
        </div>
    )
}
export default RegisterPage