import React from "react";

const TaskCard = ({ title, description }) => {
    return(
        <div className="taskCard">
            <span>{ title }</span>
            <span>{ description }</span>
        </div>
    )
}

export default TaskCard