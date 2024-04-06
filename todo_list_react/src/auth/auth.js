import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000"

async function register(data) {
    const authurl = `/users/register`
    return axios.post(authurl, data)
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
    return axios.post(authurl, data)
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
        axios.get(authurl)
            .then((response) => {
                console.log("Logged out");
                localStorage.clear()
                return response.data
            })
            .catch((error) => {throw error});
    }
}

export { register, login, logout };