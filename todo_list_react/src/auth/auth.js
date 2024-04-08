import axios from "axios";


export const axios_instance = axios.create({
    baseURL: "http://localhost:8000"
})

const set_auth = (axios_instance) => {
    const token = localStorage.getItem("access_token")
    axios_instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

async function register(data) {
    const authurl = `/users/register`
    return axios_instance.post(authurl, data)
        .then((response) => {
            const token = response.data.access_token;
            const email = response.data.email;
            localStorage.setItem("access_token", token);
            localStorage.setItem("email", email);
        })
        .catch((error) => {throw error});
}

async function login(data) {
    const authurl = `/users/login`
    return axios_instance.post(authurl, data)
        .then((response) => {
            const token = response.data.access_token;
            const email = response.data.email;
            console.log(response.data)
            localStorage.setItem("access_token", token);
            localStorage.setItem("email", email);
        })
        .catch((error) => {throw error});
}

async function logout() {
    if (localStorage.getItem("access_token") !== null) {
        const authurl = `/users/logout`;
        axios_instance.get(authurl)
            .then((response) => {
                console.log("Logged out");
                localStorage.clear()
                axios.defaults.headers.common.Authorization.clear()
                return response.data
            })
            .catch((error) => {throw error});
    }
}

export { set_auth, register, login, logout };