import axios from "axios";
import cookie from 'cookiejs';


export const axios_instance = axios.create({
    baseURL: "http://localhost:8000"
})

const set_auth = (axios_instance) => {
    const token = cookie.get("access_token");
    axios_instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const set_cookie = (token) => {
    let now = new Date();
    let time = now.getTime();
    const expireTime = time + 1000*1800;
    now.setTime(expireTime);
    cookie.set("access_token", token, {
        expires: now,
    })
}

async function register(data) {
    const authurl = `/users/register`
    return axios_instance.post(authurl, data)
        .then((response) => {
            const token = response.data.access_token;
            const email = response.data.email;
            set_cookie(token);
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
            set_cookie(token)
            localStorage.setItem("email", email);
        })
        .catch((error) => {throw error});
}

async function logout() {
    if (cookie.get("access_token") !== null) {
        const authurl = `/users/logout`;
        axios_instance.get(authurl)
            .then((response) => {
                console.log("Logged out");
                cookie.clear()
                localStorage.clear()
                axios.defaults.headers.common.Authorization = null
                return response.data
            })
            .catch((error) => {throw error});
    }
}

export { set_auth, register, login, logout };