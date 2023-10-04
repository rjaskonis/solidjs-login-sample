import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:1337/api";

axios.interceptors.request.use(
    function (config) {
        if (config.url === "/auth/local") return config;

        const accessToken = localStorage.getItem("access_token");

        if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axios;
