import React from "react";
import axios from "axios";

const TaskList = () => {
    axios.get('http://127.0.0.1:8000/tasks')
        .then((r) = r.json())
    console.log(r)
}

export default TaskList