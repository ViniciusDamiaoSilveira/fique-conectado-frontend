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

    if (method == "GET") {
        return (token === null) ? (await axiosInstanceLocal.get(url))
            : (await axiosInstanceLocal.get(url, config))
    }

    if (method == "PUT") {
        return (token === null) ? (await axiosInstanceLocal.put(url, body))
            : (await axiosInstanceLocal.put(url, body, config))
    }

    if (method == "DELETE") {
        return (token === null) ? (await axiosInstanceLocal.put(url, body))
            : (await axiosInstanceLocal.delete(url, config))
    }


}