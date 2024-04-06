import React, {useEffect} from "react";
import Login_button from "./login_button";
import Logout_button from "./logout_button";


const Header = (props) => {
    const isAuth = props.isAuth;

    if (isAuth) {
        return(
            <div className="header">
                <div className="header-title">
                    To-Do List
                </div>
                <div className="header-right-side">
                    <div className="header-right-side-text">
                        Hello, {localStorage.getItem("email")}
                    </div>
                    <Logout_button/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="header">
                <div className="header-title">
                    To-Do List
                </div>
                <Login_button />
            </div>
        )
    }
}

export default Header