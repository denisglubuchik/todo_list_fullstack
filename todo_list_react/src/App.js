import React, {useState} from "react";
import Header from "./components/header";

const App = () => {
  const [isAuth, setAuth] = useState(false);
  const [username, setUsername] = useState("");

  useState(() => {
    if (localStorage.getItem("access_token") !== null) {
      const username = setUsername(localStorage.getItem("username"));
      setAuth(true);
    }
  }, [isAuth, username]);

  return (
      <>
        <div>
          <Header isAuth={isAuth} />
        </div>
      </>
  )
}

export default App;