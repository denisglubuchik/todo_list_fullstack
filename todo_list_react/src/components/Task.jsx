import React from "react";

const TaskCard = ({task}) => {
    return(
        <div className="taskCard">
            <h2>{ task.title }</h2>
            <h3>{ task.description }</h3>
        </div>
    )
}

export default TaskCard