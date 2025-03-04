import axios from "axios";
import IgdbAxios from "../../api/igdb/gameAPI";
import TmdbAxios from "../../api/tmdb/movieAPI";
import { GOOGLE_KEY, GOOGLE_URL } from "../constants";

interface selectProps {
    id: string,
    name: string
}

export async function getCategories(type: string) {
    let response: any;
    let result: selectProps[] = []

    if (type == "filmes") {
        response = await TmdbAxios('/genre/movie/list?language=pt-BR');
    }

    if (type == "series") {
        response = await TmdbAxios('/genre/tv/list?language=pt-BR');
    }

    if (response) response.data.genres.map((genre: any) => {
        result.push({id: genre.id, name: genre.name})
    })

    if (type == "jogos") {
        let url = "genres";
        let body = `fields id, name; limit 50;`
        let response = IgdbAxios(url, body)
    
        let to = "pt"
        let from = "en"
        

        const result_query = (await response).data
        result_query.map(async (value: any) => {
            let text = value.name
            const name = (await axios.post(`${GOOGLE_URL}key=${GOOGLE_KEY}&source=${from}&target=${to}&q=${text}`)).data.data.translations[0].translatedText
            result.push({id: value.id, name: name})       
        })
    }
    
    return result
}