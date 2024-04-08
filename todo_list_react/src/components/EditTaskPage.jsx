import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {edit_task} from "../api/api";
import {axios_instance, set_auth} from "../auth/auth";

const EditTaskPage = () => {
    const location = useLocation()
    const { task } = location.state

    const beforeEditTitle = task.title
    const beforeEditDescription = task.description
    const beforeEditDone = task.is_done

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [done, setDone] = useState(task.is_done)

    useEffect(() => {
            set_auth(axios_instance)
    }, []);

    // const navigate = useNavigate()

    const handleSave = () => {
        let modal = document.getElementById("editModal")
        window.onclick = async function(event) {
            if (event.target === modal) {
                const data = {
                    id: task.id,
                    title: title,
                    description: description,
                    is_done: done
                }
                if (beforeEditTitle !== title || beforeEditDescription !== description || beforeEditDone !== done) {
                    try {
                        await Promise.all([edit_task(axios_instance, task.id, data)])
                            .then(() => {
                                window.location.href = "/"
                                // navigate("/")
                            })
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    window.location.href = "/"
                    // navigate("/")
                }
            }
        }
    }

    return(
        <div className="edit-task-container" onClick={handleSave} id="editModal">
            <div className="edit-task-wrapper">
                <h1>Edit Task</h1>
                <form className="edit-task-form">
                    <input type="text"
                           defaultValue={task.title}
                           value={title}
                           onChange={(ev) => setTitle(ev.target.value)}
                           className="inputBox"
                    />
                    <br/>

                    <textarea
                           defaultValue={task.description}
                           value={description}
                           onChange={(ev) => setDescription(ev.target.value)}
                           className="edit-task-textarea inputBox"
                    />
                    <div style={{ display: "flex" }}>
                        <input type="checkbox"
                               defaultChecked={task.is_done}
                               onChange={(ev) => setDone(ev.target.checked)}
                        /> Is Done
                    </div>


                </form>
            </div>
        </div>
    )
}

export default EditTaskPage

// {task.is_done ?
//                         (<div style={{ display: "flex"}}>
//                             <input type="checkbox"
//                                value={done}
//                                onChange={(ev) => setDone(ev.target.value)}
//                                defaultChecked
//                             />Is Done
//                         </div>
//                         ) :
//                         (<div style={{ display: "flex"}}>
//                             <input type="checkbox"
//                                value={done}
//                                onChange={(ev) => setDone(ev.target.value)}
//                             />Is Done
//                         </div>)
//                     }