import axios from "axios";
import axiosInstanceIgdb from "./instance";
import { VITE_IGDB_API_TOKEN_URL, VITE_IGDB_CLIENT_ID } from "../../utils/constants";

 
export async function IgdbAxios(url: string, body?: string) {

    const bearer = (await axios.post(VITE_IGDB_API_TOKEN_URL)).data.access_token

    let config = {
        headers: {
            Authorization: "Bearer " + bearer,
            "Client-ID": VITE_IGDB_CLIENT_ID,
        }
    }
    
    if (body) return axiosInstanceIgdb.post(url, body, config)
    return  axiosInstanceIgdb.post(url, config)
}

export default IgdbAxios;