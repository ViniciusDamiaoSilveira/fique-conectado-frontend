import axios from "axios";
import { VITE_IGBD_API } from "../../utils/constants";


const axiosInstanceIgdb = axios.create({
    baseURL: VITE_IGBD_API,
})

export default axiosInstanceIgdb;
