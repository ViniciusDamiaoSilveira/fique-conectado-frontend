import axiosInstanceLocal from "./instance";

export async function UserLocalAxios(url: string, method: string, token: string | null, body?: any) {

    let config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    
    if (method == "POST") {
        return (token === null) ? (await axiosInstanceLocal.post(url, body))
            : (await axiosInstanceLocal.post(url, body, config))
    }
}