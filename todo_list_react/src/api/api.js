const get_tasks = (axios_instance) => {
    console.log(axios_instance.defaults.headers.common, "w")
    return axios_instance.get("/tasks")
}

export {
    get_tasks
}