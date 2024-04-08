import React, {useState} from "react";
import {useEffect} from "react";
import cookie from "cookiejs";
import Header from "./components/header";
import TaskList from "./components/TaskList";

const App = () => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    if (cookie.get("access_token")) {
      setAuth(true);
    }
  }, [isAuth]);

  return (
      <>
        <div>
          <Header isAuth={isAuth} />
        </div>
          {isAuth ?
              (<TaskList />):(<h1>Please authorize</h1>)
          }

      </>
  )
}

export default App;