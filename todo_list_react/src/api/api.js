const get_tasks = (axios_instance) => {
    console.log(axios_instance.defaults.headers.common, "w")
    return axios_instance.get("/tasks")
}

const create_task = (axios_instance, data) => {
    return axios_instance.post("/tasks", data)
}

export {
    get_tasks,
    create_task,
}