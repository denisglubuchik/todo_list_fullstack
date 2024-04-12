const get_tasks = (axios_instance) => {
    console.log(axios_instance.defaults.headers.common, "w")
    return axios_instance.get("/tasks")
}

const create_task = (axios_instance, data) => {
    return axios_instance.post("/tasks", data)
}

const edit_task = (axios_instance, task_id, data) => {
    return axios_instance.put(`/tasks/${task_id}`, data)
}

const delete_task = (axios_instance, task_id) => {
    return axios_instance.delete(`/tasks/${task_id}`)
}

export {
    get_tasks,
    create_task,
    edit_task,
    delete_task,
}