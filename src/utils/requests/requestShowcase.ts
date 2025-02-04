import TmdbAxios from "../../api/tmdb/movieAPI";
import { VITE_TMDB_IMG } from "../constants";

import NotFoundMovie from "../../images/NotFoundMovie.svg"
import NotFoundSerie from "../../images/NotFoundSerie.svg"
import NotFoundGame from "../../images/NotFoundGame.svg"
import { jogosNacionais } from "../jogosNacionais";

interface entertainmentProps {
    id: string,
    img: string,
}

interface jogosNacionaisProps {
    id: string,
    title: string,
    img: string,
    rating: number,
}

export async function getShowcase(type: string): Promise<entertainmentProps[]> {
    let type_query;
        if (type == 'series') type_query = 'tv'
        if (type == 'filmes') type_query = 'movie'
        
        if (type == 'jogos') {
            let results: entertainmentProps[] = [];
            jogosNacionais.map((jogo: jogosNacionaisProps) => {
                results.push({
                    id: jogo.id,
                    img: jogo.img
                })
            })
    
            return results
        }

    const page = Math.floor(Math.random() * (35 - 1) + 1)
    const urlShowcase = `discover/${type_query}?include_adult=false&include_video=false&language=pt-BR&sort_by=popularity.desc&with_origin_country=BR&with_original_language=pt&page=${page}`
    const response = await TmdbAxios(urlShowcase)

    const listEntertainment = response.data.results
    let results:entertainmentProps[] = [];


    listEntertainment.map((entertainment: any) => {
        if(entertainment.poster_path) {
            entertainment.poster_path = VITE_TMDB_IMG + entertainment.poster_path;
        } else {
            if (type == "filmes") {
                entertainment.poster_path = NotFoundMovie;
            } else if (type == "series") {
                entertainment.poster_path = NotFoundSerie;
            } else {
                entertainment.poster_path = NotFoundGame;
            }
        }
    })

    listEntertainment.map((entertainment: any) => {
        results.push({
            id: entertainment.id,
            img: entertainment.poster_path
        })
    })

    return results
}