import axios from "axios";
import { VITE_TMDB_API } from "../../utils/constants";


const axiosInstanceTmdb = axios.create({
    baseURL: VITE_TMDB_API
})

export default axiosInstanceTmdb;
