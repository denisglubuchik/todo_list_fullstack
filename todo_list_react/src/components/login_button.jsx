import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Login_button = () => {
    return(
        <div>
            <Link to="login">
                <button className="header-button login-button">
                    Login
                </button>
            </Link>
        </div>

    )
}

export default Login_button