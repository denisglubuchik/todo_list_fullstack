import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {logout} from "../auth/auth";

const Logout_button = () => {

    async function handleLogout() {
        try {
            const res = await logout();
            window.location.href ='/';
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
                <button className="header-button" onClick={handleLogout}>
                    Logout
                </button>
        </div>

    )
}

export default Logout_button