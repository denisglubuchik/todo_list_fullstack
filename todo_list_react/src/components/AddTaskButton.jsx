import React from "react";
import {Link} from "react-router-dom";

const AddTaskButton = () =>{
    return(
        <div>
            <Link to="new_task">
                <button>
                    Add New Task
                </button>
            </Link>
        </div>

    )
}

export default AddTaskButton