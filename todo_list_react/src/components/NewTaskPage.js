import React, {useEffect, useState} from "react";
import {create_task, edit_task, get_tasks} from "../api/api";
import {axios_instance, set_auth} from "../auth/auth";
import {useNavigate} from "react-router-dom";

const NewTaskPage = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const navigate = useNavigate()

    useEffect(() => {
            set_auth(axios_instance)
    }, []);

    const handleCancel = () => {
        let modal = document.getElementById("editModal")
        window.onclick = async function(event) {
            if (event.target === modal) {
                navigate("/")
            }
        }
    }

    const handleNewTask = async () => {

        const data = {
            "title": title,
            "description": description,
        };
        try{
            await Promise.all([create_task(axios_instance, data)])
                .then(() => {
                    setTitle("");
                    setDescription("");
                    // navigate("/")
                    window.location.href = "/"
                })
        } catch (error) {
            console.log(error)
        }

    };


    return(
        <div className="edit-or-new-task-container" onClick={handleCancel} id="editModal">
            <div className="edit-or-new-task-wrapper">
                <h1>Add New Task</h1>
                <form className="edit-or-new-task-form">
                    <input type="text"
                           placeholder="Enter title here"
                           value={title}
                           onChange={(ev) => setTitle(ev.target.value)}
                           className="inputBox"
                    />
                    <input type="text"
                           placeholder="Enter description here"
                           value={description}
                           onChange={(ev) => setDescription(ev.target.value)}
                           className="edit-or-new-task-textarea inputBox"
                    />
                    <input className={'inputButton'} type="button" onClick={handleNewTask} value={'Submit'}/>
                </form>
            </div>
        </div>
    )
}

export default NewTaskPage;
