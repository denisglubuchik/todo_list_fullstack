import React, {useState} from "react";
import Header from "./components/header";
import {get_tasks} from "./api/api";
import TaskList from "./components/TaskList";

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
          {isAuth ?
              (<TaskList />):(<h1>Please authorize</h1>)
          }

      </>
  )
}

export default App;