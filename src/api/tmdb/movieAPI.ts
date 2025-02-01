import axiosInstanceTmdb from "./instance";
import { VITE_TMDB_BEARER } from "../../utils/constants";


export async function TmdbAxios(url: string) {

    let config = {
        headers: {
            Authorization: "Bearer " + VITE_TMDB_BEARER
        }
    }
    
    return axiosInstanceTmdb.get(url, config)
}

export default TmdbAxios;