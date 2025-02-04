import TmdbAxios from "../../api/tmdb/movieAPI"
import { VITE_TMDB_IMG } from "../constants"

import NotFoundMovie from "../../images/NotFoundMovie.svg"
import NotFoundSerie from "../../images/NotFoundSerie.svg"
import NotFoundGame from "../../images/NotFoundGame.svg"
import IgdbAxios from "../../api/igdb/gameAPI"


interface entertainmentProps {
    id: number,
    title: string,
    img: string,
    rating: number,
}


// Requests aba - Filmes
export async function GetLancamentosNacionaisFilmes():Promise<entertainmentProps[]> {
    let url = `discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&primary_release_year=2025&sort_by=popularity.desc&with_origin_country=BR&with_original_language=pt`
    let response = await TmdbAxios(url)
    let listMovies = response.data.results

    let lancamentos: entertainmentProps[] = []        
    
    listMovies.map((movie: any) => {
        if (movie.poster_path) {
            movie.poster_path = VITE_TMDB_IMG + movie.poster_path
        } else {
            movie.poster_path = NotFoundMovie
        }

        lancamentos.push({
            id: movie.id,
            title: movie.title,
            img: movie.poster_path,
            rating: parseFloat((movie.vote_average / 2).toFixed(1))
        })
    })

    return lancamentos;
}

export async function GetPopularesNacionaisFilmes():Promise<entertainmentProps[]> {
    let url = `discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&vote_count.gte=400&with_origin_country=BR&with_original_language=pt`
    let response = await TmdbAxios(url)
    let listMovies = response.data.results

    let populares: entertainmentProps[] = []

    listMovies.map((movie: any) => {
        if (movie.poster_path) {
            movie.poster_path = VITE_TMDB_IMG + movie.poster_path
        } else {
            movie.poster_path = NotFoundMovie
        }
        populares.push({
            id: movie.id,
            title: movie.title,
            img: movie.poster_path,
            rating: parseFloat((movie.vote_average / 2).toFixed(1))
        })
    })

    return populares;
}

export async function GetMelhoresNacionaisFilmes():Promise<entertainmentProps[]> {
    let url = `discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&vote_average.gte=7.2&vote_count.gte=500&with_origin_country=BR&with_original_language=pt`
    let response = await TmdbAxios(url)
    let listMovies = response.data.results

    let best: entertainmentProps[] = []

    listMovies.map((movie: any) => {
        if (movie.poster_path) {
            movie.poster_path = VITE_TMDB_IMG + movie.poster_path
        } else {
            movie.poster_path = NotFoundMovie
        }
        best.push({
            id: movie.id,
            title: movie.title,
            img: movie.poster_path,
            rating: parseFloat((movie.vote_average / 2).toFixed(1))
        })
    })

    return best;

}

export async function GetLancamentosNacionaisSeries():Promise<entertainmentProps[]> {
    let url = `discover/tv?first_air_date_year=2025&include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&with_origin_country=BR&with_original_language=pt`
    let response = await TmdbAxios(url)
    let listSeries = response.data.results

    let lancamentos: entertainmentProps[] = []

    listSeries.map((serie: any) => {
        if (serie.poster_path) {
            serie.poster_path = VITE_TMDB_IMG + serie.poster_path
        } else {
            serie.poster_path = NotFoundSerie
        }

        lancamentos.push({
            id: serie.id,
            title: serie.name,
            img: serie.poster_path,
            rating: parseFloat((serie.vote_average / 2).toFixed(1))
        })
    })


    return lancamentos;
}

export async function GetPopularesNacionaisSeries():Promise<entertainmentProps[]> {
    let url = `discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&vote_count.gte=100&with_origin_country=BR&with_original_language=pt`
    let response = await TmdbAxios(url)
    let listSeries = response.data.results
    
    let populares: entertainmentProps[] = []

    listSeries.map((serie: any) => {
        if (serie.poster_path) {
            serie.poster_path = VITE_TMDB_IMG + serie.poster_path
        } else {
            serie.poster_path = NotFoundSerie
        }

        populares.push({
            id: serie.id,
            title: serie.name,
            img: VITE_TMDB_IMG + serie.poster_path,
            rating: parseFloat((serie.vote_average / 2).toFixed(1))
        })
    })

    return populares;
}

export async function GetMelhoresNacionaisSeries():Promise<entertainmentProps[]> {
    let url = `discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&vote_average.gte=7.2&with_origin_country=BR&with_original_language=pt`
    let response = await TmdbAxios(url)
    let listSeries = response.data.results
    
    let best: entertainmentProps[] = []

    listSeries.map((serie: any) => {
        if (serie.poster_path) {
            serie.poster_path = VITE_TMDB_IMG + serie.poster_path
        } else {
            serie.poster_path = NotFoundSerie
        }

        best.push({
            id: serie.id,
            title: serie.name,
            img: VITE_TMDB_IMG + serie.poster_path,
            rating: parseFloat((serie.vote_average / 2).toFixed(1))
        })
    })

    return best;

}

export async function getPopularesJogos() {
    const url = "games";
    const body = `fields id, name, total_rating, cover.url;
                    where total_rating_count > 400;
                    sort rating desc;
                    limit 50;`

    const response = IgdbAxios(url, body)
    let results:entertainmentProps[] = [];

    const listJogos = (await response).data
    listJogos.map((jogo: any) => {
        if (jogo.cover) {
            jogo.cover.url = jogo.cover.url.replace("t_thumb", "t_1080p");
        } else {
            jogo.cover.url = NotFoundGame;
        }
        results.push({
            id: jogo.id,
            img: jogo.cover.url,
            title: jogo.name,
            rating: (jogo.total_rating / 10) / 2
        })
    })

    return results;
}

export async function getMelhoresJogos() {
    const url = "games";
    const body = `fields id, name, total_rating, cover.url;
                    where rating != null & total_rating_count > 100;
                    sort rating desc;
                    limit 50;`

    const response = IgdbAxios(url, body)
    let results:entertainmentProps[] = [];

        const listJogos = (await response).data
        listJogos.map((jogo: any) => {
            if (jogo.cover) {
                jogo.cover.url = jogo.cover.url.replace("t_thumb", "t_1080p");
            } else {
                jogo.cover.url = NotFoundGame;
            }
            results.push({
                id: jogo.id,
                img: jogo.cover.url,
                title: jogo.name,
                rating: (jogo.total_rating / 10) / 2
            })
        })

        return results;
    
}