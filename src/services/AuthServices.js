import { AxiosClient } from "./AxiosClient"


class AuthServices {
    singup = async (email, username, password) => {
        return await AxiosClient.post('/auth/inscription', {
            email,
            username,
            password
        })
    }
    login = async (email, password) => {
        return await AxiosClient.post('/auth/connection', {
            email,
            password
        })
    }
    isAuthenticated = async () => {
        const token = localStorage.getItem("auth-token");

        return AxiosClient.get("/auth/", {
            headers: {
                "auth-token": `${token}`,
            }
        })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthServices();

