import TmdbAxios from "../../api/tmdb/movieAPI";
import { VITE_TMDB_IMG } from "../constants";

import NotFoundMovie from "../../images/NotFoundMovieLarge.svg"
import NotFoundSerie from "../../images/NotFoundSerieLarge.svg"
import NotFoundGame from "../../images/NotFoundGameLarge.svg"
import IgdbAxios from "../../api/igdb/gameAPI";

interface entertainmentsProps {
    id: string,
    name: string,
    rating: number,
    poster: string,
}

interface selectProps {
    id: string,
    name: string
}

export async function GetMovies(type_list: string, page: number, duration: selectProps | null, genre: selectProps | null, year: number, date: string) {
    let response: any;
    let movies: entertainmentsProps[] = []
    
    if (type_list == 'lancamentos') {
        response = await TmdbAxios(`discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&primary_release_year=${year}&primary_release_date.gte=${date}&sort_by=popularity.desc${genre?.id ? `&with_genres=${genre?.id}` : ""}${duration?.id ? `&with_runtime.lte=${duration?.id}` : ""}`)        
    }

    if (type_list == 'populares') {
        response = await TmdbAxios(`discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&vote_average.gte=7&vote_count.gte=2000&sort_by=popularity.desc${genre?.id ? `&with_genres=${genre?.id}` : ""}${duration?.id ? `&with_runtime.lte=${duration?.id}` : ""}`)        
    }

    if (type_list == 'melhores') {
        response = await TmdbAxios(`discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&vote_average.gte=8&vote_count.gte=2000&sort_by=popularity.desc${genre?.id ? `&with_genres=${genre?.id}` : ""}${duration?.id ? `&with_runtime.lte=${duration?.id}` : ""}`)        
    }

    const result: any = await response.data.results;
    result.map((movie: any) => {
        let img: string; 
        if (movie.poster_path) {
            img = `${VITE_TMDB_IMG}${movie.poster_path}`
        } else {
            img = NotFoundMovie
        }

        movies.push({
            id: movie.id, 
            name: movie.title, 
            poster: img, 
            rating: parseFloat((movie.vote_average / 2).toFixed(2))
        })
    })
    
    let total_pages = response.data.total_pages

    if (response.data.total_pages > 150) {
        total_pages = 150
    }

    return [movies, total_pages]
}

export async function GetSeries(type_list: string, page: number, genre: selectProps | null, year: number, date: string) {
    let response: any;
    let series: entertainmentsProps[] = []

    if (type_list == 'lancamentos') {
        response = await TmdbAxios(`discover/tv?include_adult=false&include_video=false&language=pt-BR&page=${page}&primary_release_year=${year}&air_date.gte=${date}&sort_by=popularity.desc${genre?.id ? `&with_genres=${genre?.id}` : ""}`)        
    }

    if (type_list == 'populares') {
        response = await TmdbAxios(`discover/tv?include_adult=false&include_video=false&language=pt-BR&page=${page}&vote_average.gte=7&vote_count.gte=2000&sort_by=popularity.desc${genre?.id ? `&with_genres=${genre?.id}` : ""}`)        
    }

    if (type_list == 'melhores') {
        response = await TmdbAxios(`discover/tv?include_adult=false&include_video=false&language=pt-BR&page=${page}&vote_average.gte=8&vote_count.gte=2000&sort_by=popularity.desc${genre?.id ? `&with_genres=${genre?.id}` : ""}`)        
    }

    const result: any = await response.data.results;
    result.map((serie: any) => {
        let img: string; 
        if (serie.poster_path) {
            img = `${VITE_TMDB_IMG}${serie.poster_path}`
        } else {
            img = NotFoundSerie
        }

        series.push({
            id: serie.id, 
            name: serie.name, 
            poster: img, 
            rating: parseFloat((serie.vote_average / 2).toFixed(2))
        })
    })
    
    let total_pages = response.data.total_pages

    if (response.data.total_pages > 150) {
        total_pages = 150
    }

    return [series, total_pages]

}

export async function GetGames(type_list: string, offset: number, genre: string) {
    let total_pages: number = 0
    let result: entertainmentsProps[] = []
    let genre_text = `${genre ? `& genres = ${genre};` : ";"}`

    if (type_list == "populares") {
        let url = "games";
        let body = `fields id, name, total_rating, cover.url;
        where rating != null${genre_text}
        sort rating desc;
        limit 20; 
        offset ${offset};`
        let response = await (await IgdbAxios(url, body)).data

        response.map((game: any) => {
            if (game.cover) {
                game.cover.url = game.cover.url.replace("t_thumb", "t_1080p");
            } else {
                game.cover.url = NotFoundGame;
            }

            result.push({ 
                id: game.id, 
                name: game.name, 
                poster: game.cover.url,
                rating: parseFloat(((game.total_rating / 10) / 2).toFixed(2))
            })
        })

        total_pages = 50
    }

    if (type_list == "melhores") {
        let url = "games";
        let body = `fields id, name, total_rating, cover.url;
            where rating != null & total_rating_count > 800 ${genre_text}
            sort rating desc;
            limit 20;
            offset ${offset};`
        let response = await (await IgdbAxios(url, body)).data

        response.map((game: any) => {
            if (game.cover) {
                game.cover.url = game.cover.url.replace("t_thumb", "t_1080p");
            } else {
                game.cover.url = NotFoundGame;
            }

            result.push({ 
                id: game.id, 
                name: game.name, 
                poster: game.cover.url,
                rating: parseFloat(((game.total_rating / 10) / 2).toFixed(2))
            })
        })

        total_pages = 8
    }

    return [result, total_pages]
    
}

