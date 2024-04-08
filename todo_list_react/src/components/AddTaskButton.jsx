import React from "react";
import {Link} from "react-router-dom";

const AddTaskButton = () =>{
    return(
        <div className="new-task-button-container">
            <Link to="new_task">
                <button className="new-task-button">
                    Add New Task
                </button>
            </Link>
        </div>

    )
}

export default AddTaskButton