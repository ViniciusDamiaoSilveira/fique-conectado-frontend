import { VITE_TMDB_IMG } from "../constants";
import { jogosNacionais } from "../jogosNacionais";

import IgdbAxios from "../../api/igdb/gameAPI";
import TmdbAxios from "../../api/tmdb/movieAPI";

import NotFoundMovie from "../../images/NotFoundMovie.svg"
import NotFoundSerie from "../../images/NotFoundSerie.svg"
import NotFoundGame from "../../images/NotFoundGame.svg"

interface itemsProps {
    id: string,
    title: string,
    img: string,
}

export async function SearchAutoComplete(text: string, type: string) {
    let type_query;    

    if (type == 'jogos') {        
        const url = "games";
        const body = `fields id, name, cover.url;
                        search "${text}";
                        limit 10;`
        const response = IgdbAxios(url, body)
        let results:itemsProps[] = [];

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
                title: jogo.name
            })
        })

        return results;
    }

    if (type == 'series') type_query = 'tv'
    if (type == 'filmes') type_query = 'movie'

    const url = `/search/${type_query}?query=${text}&include_adult=false&language=pt-BR&page=1`
    const response = await TmdbAxios(url)

    const listEntertainment = response.data.results
    let results:itemsProps[] = [];

    listEntertainment.map((entertainment: any) => {
        if(entertainment.poster_path) {
            entertainment.poster_path = VITE_TMDB_IMG + entertainment.poster_path;
        } else {
            if (type == "filmes") {
                entertainment.poster_path = NotFoundMovie;
                
            } else {
                entertainment.poster_path = NotFoundSerie;   
            }
        }

        results.push({
            id: entertainment.id,
            img: entertainment.poster_path,
            title: type == "filmes" ? entertainment.title : entertainment.name
        })

    })

    return results
}