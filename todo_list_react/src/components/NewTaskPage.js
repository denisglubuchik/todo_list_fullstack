import React, {useEffect, useState} from "react";
import {create_task, get_tasks} from "../api/api";
import {axios_instance, set_auth} from "../auth/auth";
import {useNavigate} from "react-router-dom";

const NewTaskPage = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const navigate = useNavigate()

    useEffect(() => {
            set_auth(axios_instance)
    }, []);

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
                    navigate("/")
                })
        } catch (error) {
            console.log(error)
        }

    };


    return(
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Add New Task</div>
            </div>
            <form className="Input-Form">
                <div className="InputContainer">
                    <input type="text"
                           placeholder="Enter title here"
                           value={title}
                           onChange={(ev) => setTitle(ev.target.value)}
                           className="inputBox"
                    />
                </div>
                <br/>

                <div className="InputContainer">
                    <input type="text"
                           placeholder="Enter description here"
                           value={description}
                           onChange={(ev) => setDescription(ev.target.value)}
                           className="inputBox"
                    />
                </div>
                <br/>

                <div className="InputContainer">
                    <input className={'inputButton'} type="button" onClick={handleNewTask} value={'Submit'}/>
                </div>
            </form>
        </div>
    )
}

export default NewTaskPage;
