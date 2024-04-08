import React, {useEffect, useState} from "react";
import axios from "axios";
import {axios_instance, set_auth} from "../auth/auth";
import {get_tasks} from "../api/api";
import TaskCard from "./Task";
import AddTaskButton from "./AddTaskButton";

const TaskList = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        set_auth(axios_instance)
        const set_tasks = async () => {
            await Promise.all([get_tasks(axios_instance)])
                .then((r) => setTasks(r[0].data))

        };
        set_tasks()
    }, []);


    return (
        <>
            <AddTaskButton/>
            <ul>
                <h1>Active Tasks</h1>
                {tasks.map((task) => {
                    if (!task.is_done) {
                        return (
                            <li key={task.id}>
                                <TaskCard task={task}/>
                            </li>
                        )
                    }
                })}
            </ul>
            <hr/>
            <ul>
                <h1>Done Tasks</h1>
                {tasks.map((task) => {
                    if (task.is_done) {
                        return (
                            <li key={task.id}>
                                <TaskCard task={task}/>
                            </li>
                        )
                    }
                })}
            </ul>
        </>

    )

}

export default TaskList