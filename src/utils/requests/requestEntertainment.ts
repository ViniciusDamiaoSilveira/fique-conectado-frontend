import IgdbAxios from "../../api/igdb/gameAPI";
import axios from "axios";

import { GOOGLE_KEY, GOOGLE_URL, VITE_TMDB_IMG } from "../constants";
import { getPlatformLogo } from "../platforms";

import Other from "../../images/Other-icon.png";
import TmdbAxios from "../../api/tmdb/movieAPI";

import NotFoundMovie from "../../images/NotFoundMovieLarge.svg"
import NotFoundSerie from "../../images/NotFoundSerieLarge.svg"
import NotFoundGame from "../../images/NotFoundGameLarge.svg"


interface entertaimentProps {
    title: string,
    poster: string,
    background: string
    description: string,
    rating: number,
    genres: any[],
    plataformas?: any[],
    release: string,
    time_to_beat?: string,
    platinum?: string,
    country?: string,
    runtime?: string,
    numberSeason?: any[]
}

export async function getEntertainmentGame(id: string) {
    let url = "games";
    let body = `fields name,genres.name, cover.url, platforms.name, platforms.platform_family, screenshots.url, created_at, rating, summary; where id = ${parseInt(id)};`
    let response = IgdbAxios(url, body)

    const result_query = (await response).data[0]
    
    let to = "pt"
    let from = "en"
    let text = result_query.summary    

    const translate_description = (await axios.post(`${GOOGLE_URL}key=${GOOGLE_KEY}&source=${from}&target=${to}&q=${text}`)).data.data.translations[0].translatedText

    let genres: any[] = []
9
    result_query.genres.map(async (genre: any) => {
        genres.push({id: genre.id, name: (await axios.post(`${GOOGLE_URL}key=${GOOGLE_KEY}&source=${from}&target=${to}&q=${genre.name}`)).data.data.translations[0].translatedText})
    })

    let result: entertaimentProps = {
        title: "",
        poster: "",
        background: "",
        description: "",
        rating: 0,
        genres: [],
        plataformas: [],
        release: "",
        time_to_beat: "",
        platinum: ""
    };

    if (result_query.cover.url) {
        result_query.cover.url = result_query.cover.url.replace("t_thumb", "t_1080p");
    } else {
        result_query.cover.url = NotFoundGame;
    }

    if (result_query.screenshots) {
        result_query.screenshots[0].url = result_query.screenshots[0].url.replace("t_thumb", "t_1080p");
    }

    let plataformas: any[] = []

    result_query.platforms.map((platform: any) => {
        if (platform.platform_family) {
            plataformas.push(getPlatformLogo(platform.platform_family))
        } else {
            plataformas.push(getPlatformLogo(platform.id))
        }
    })

    url = "game_time_to_beats"
    body = `fields normally, completely, hastily; where game_id = ${parseInt(id)};`
    response = IgdbAxios(url, body)
    
    const time_to_beat = (await response).data

    plataformas = [...new Set(plataformas)]

    if (plataformas.includes(Other)) {
        plataformas = plataformas.filter(plat => plat !== Other);
        plataformas.push(Other)
    }

    let normal_time: string;
    let platinum: string;

    if (time_to_beat.length > 0) {
        normal_time = `${parseFloat((time_to_beat[0].normally / 3600).toFixed(2)).toString()}`
        let normal_time_hora = normal_time.split(".")[0]
        let normal_time_min = (parseFloat(`0.${normal_time.split(".")[1]}`) * 60).toFixed(0)
        
        normal_time = `${normal_time_hora}h${normal_time_min}min`

        platinum = `${parseFloat((time_to_beat[0].completely / 3600).toFixed(2)).toString()}`
        let platinum_hora = platinum.split(".")[0]
        let platinum_min = (parseFloat(`0.${platinum.split(".")[1]}`) * 60).toFixed(0)

        platinum = `${platinum_hora}h${platinum_min}min`
    } else {
        normal_time = "Não informado"
        platinum = "Não informado"
    }

    result.title = result_query.name,
    result.poster = result_query.cover.url
    result.background = result_query.screenshots[0].url
    result.description = translate_description,
    result.rating = parseFloat(((result_query.rating / 10) / 2).toFixed(2))
    result.genres = genres
    result.plataformas = plataformas
    result.release = new Date(result_query.created_at * 1000).toLocaleDateString()
    result.time_to_beat = normal_time
    result.platinum = platinum

    return result
}

export async function getEntertainmentMovie(id: string) {
    const response = await TmdbAxios(`/movie/${id}?language=pt-BR`)
    
    let result: entertaimentProps = {
        title: "",
        poster: "",
        background: "",
        description: "",
        rating: 0,
        genres: [],
        release: "",
        country: "",
        runtime: "",
    }

    let data = response.data.release_date
    data = data.split("-")
    data = `${data[2]}/${data[1]}/${data[0]}`
    
    let hora = parseFloat((response.data.runtime / 60).toFixed(2))
    let hora_definitiva = hora.toString().split(".")[0]
    let minuto_definitivo = (parseFloat(`0.${hora.toString().split(".")[1]}`) * 60).toFixed(0)

    let img: string;
    if (response.data.poster_path) {
        img = `${VITE_TMDB_IMG}${response.data.poster_path}`
    } else {
        img = NotFoundMovie
    }

    result.title = response.data.title
    result.poster = img
    result.background = `${VITE_TMDB_IMG}${response.data.backdrop_path}`
    result.description = response.data.overview
    result.rating = parseFloat((response.data.vote_average / 2).toFixed(1))
    result.genres = response.data.genres
    result.release = data
    result.country = response.data.origin_country[0]
    result.runtime = `${hora_definitiva}h${minuto_definitivo}min`

    return result
}

export async function getEntertainmentTV(id: string) {
    const response = await TmdbAxios(`/tv/${id}?language=pt-BR`)

    let result: entertaimentProps = {
        title: "",
        poster: "",
        background: "",
        description: "",
        rating: 0,
        genres: [],
        release: "",
        country: "",
        numberSeason: []
    }

    let data = response.data.first_air_date
    data = data.split("-")
    data = `${data[2]}/${data[1]}/${data[0]}`

    let numberSeasons: {id: number, name: string}[] = []

    for (let i = 1; i <= response.data.number_of_seasons; i++) {
        numberSeasons.push({id: i, name: `Temporada ${i}`})
    }

    let img: string;
    
    if (response.data.poster_path) {
        img = `${VITE_TMDB_IMG}${response.data.poster_path}`
    } else {
        img = NotFoundSerie
    }

    result.title = response.data.name
    result.poster = img
    result.background = `${VITE_TMDB_IMG}${response.data.backdrop_path}`
    result.description = response.data.overview
    result.rating = parseFloat((response.data.vote_average / 2).toFixed(1))
    result.genres = response.data.genres
    result.release = data
    result.country = response.data.origin_country[0]
    result.numberSeason = numberSeasons

    return result;
}