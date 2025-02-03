import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Navigator from "../../components/navigator/navigator";
import Showcase from "../../components/showcase/showcase";
import VitrineComentario from "../../components/vitrine/comentario/vitrineComentario";
import VitrineEntretenimentos from "../../components/vitrine/entretenimentos/vitrineEntretenimentos";
import TmdbAxios from "../../api/tmdb/movieAPI";
import { VITE_TMDB_IMG } from "../../utils/constants";
import { useParams } from "react-router-dom";
import NotFound from '../../../images/Image-not-found.png' 

import './Home.css'
import IgdbAxios from "../../api/igdb/GameAPI";
import axios from "axios";


interface comentariosProps {
    id: string,
    name: string,
    entertainment: string,
    entertainmen_name: string,
    comment: string,
    views: number,
}

interface moviesProps {
    id: number,
    title: string,
    img: string,
    rating: number,
}

interface gamesProps {
    id: string,
    title: string,
    img: string,
}

const lista_comentarios: comentariosProps[] = [
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
    {
        id: "asknffasnlasl",
        name: "Vinícius Silveira",
        entertainment: "Filme",
        entertainmen_name: "Oppenheimer",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        views: 1000000,
    },
]

const jogos_nacionais = ["Mark of the deep",
    "Enigma do medo",
    "Fobia – St. Dinfna Hotel",
    "No Place for Bravery",
    "Horizon Chase 2",
    "Hazel Sky",
    "Pãozito",
    "Dolmen",
    "Dandara",
    "Blazing Chrome",
    "Out There Somewhere",
    "Kaze and the wild masks",
    "Knights of Pen and Paper"]

export default function Home() {
    const [lancamentos, setLancamentos] = useState<any[]>([])
    const [popular, setPopular] = useState<any[]>([])
    const [best, setBest] = useState<any[]>([])
    const { type } = useParams();

    async function getLancamentosMovies() {
        const url = `discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&primary_release_year=2025&sort_by=popularity.desc&with_origin_country=BR&with_original_language=pt`
        const response = await TmdbAxios(url)
        const listMovies = response.data.results

        let lancamentos: moviesProps[] = []

        listMovies.map((movie: any) => {
            lancamentos.push({
                id: movie.id,
                title: movie.title,
                img: VITE_TMDB_IMG + movie.poster_path,
                rating: parseFloat((movie.vote_average / 2).toFixed(1))
            })
        })

        setLancamentos(lancamentos)
    }

    async function getPopularMovies() {
        const url = `discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&vote_count.gte=400&with_origin_country=BR&with_original_language=pt`
        const response = await TmdbAxios(url)
        const listMovies = response.data.results

        let populares: moviesProps[] = []

        listMovies.map((movie: any) => {
            populares.push({
                id: movie.id,
                title: movie.title,
                img: VITE_TMDB_IMG + movie.poster_path,
                rating: parseFloat((movie.vote_average / 2).toFixed(1))
            })
        })

        setPopular(populares)
    }

    async function getBestMovies() {
        const url = `discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&vote_average.gte=7.2&vote_count.gte=500&with_origin_country=BR&with_original_language=pt`
        const response = await TmdbAxios(url)
        const listMovies = response.data.results

        let best: moviesProps[] = []

        listMovies.map((movie: any) => {
            best.push({
                id: movie.id,
                title: movie.title,
                img: VITE_TMDB_IMG + movie.poster_path,
                rating: parseFloat((movie.vote_average / 2).toFixed(1))
            })
        })

        setBest(best)
    }
    
    async function getLancamentosSeries() {
        const url = `discover/tv?first_air_date_year=2025&include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&with_origin_country=BR&with_original_language=pt`
        const response = await TmdbAxios(url)
        const listSeries = response.data.results

        console.log(listSeries);
        

        let lancamentos: moviesProps[] = []

        listSeries.map((serie: any) => {
            lancamentos.push({
                id: serie.id,
                title: serie.name,
                img: VITE_TMDB_IMG + serie.poster_path,
                rating: parseFloat((serie.vote_average / 2).toFixed(1))
            })
        })

        setLancamentos(lancamentos)
    }

    async function getPopularSeries() {
        const url = `discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&vote_count.gte=100&with_origin_country=BR&with_original_language=pt`
        const response = await TmdbAxios(url)
        const listSeries = response.data.results

        console.log(listSeries);
        
        let populares: moviesProps[] = []

        listSeries.map((serie: any) => {
            populares.push({
                id: serie.id,
                title: serie.name,
                img: VITE_TMDB_IMG + serie.poster_path,
                rating: parseFloat((serie.vote_average / 2).toFixed(1))
            })
        })

        setPopular(populares)
    }

    async function getBestSeries() {
        const url = `discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&vote_average.gte=7.2&with_origin_country=BR&with_original_language=pt`
        const response = await TmdbAxios(url)
        const listSeries = response.data.results

        console.log(listSeries);
        
        let best: moviesProps[] = []

        listSeries.map((serie: any) => {
            best.push({
                id: serie.id,
                title: serie.name,
                img: VITE_TMDB_IMG + serie.poster_path,
                rating: parseFloat((serie.vote_average / 2).toFixed(1))
            })
        })

        setBest(best)
    }
    
    async function getNacionaisJogos() {
        const url = `games`
        let jogos: gamesProps[] = []
        let list_response: any[] = []
        jogos_nacionais.map(async (jogos: string, index) => {

            if (index == 2 || index == 5 || index == 8 || index == 10) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                let response: any;
                let body = `fields id, name, rating, cover.url;
                search "${jogos}";`;
                response = await IgdbAxios(url, body)
                list_response.push(response.data)
            }
            
        })
        

        list_response.map((game: any) => {
            jogos.push({
                id: game.id,
                title: game.name,
                img: game.cover.url.replace("thumb", "1080p")
           })
        })

        setLancamentos(jogos)
        
    }
    
    useEffect(() => {
        if (type == 'filmes') {
            getLancamentosMovies();
            getPopularMovies();
            getBestMovies();
        }

        if (type == 'series') {
            getLancamentosSeries();
            getPopularSeries();
            getBestSeries();
        }

        if (type == 'jogos') {
            getNacionaisJogos();
        }   
    }, [])
    
    useEffect(() => {
        if (type == 'filmes') {
            getLancamentosMovies();
            getPopularMovies();
            getBestMovies();
        }

        if (type == 'series') {
            getLancamentosSeries();
            getPopularSeries();
            getBestSeries();
        }

        if (type == 'jogos') {
            getNacionaisJogos();
        }   
    }, [type])

    return (
        <div>
            <Header />
            <div className="first-row-home">
                <div className="navigator-home">
                    <Navigator />
                    <Showcase />
                </div>

                <div className="feed-home">
                    <div className="vitrine-home">
                        <VitrineComentario
                            title="Comentários da semana"
                            subtitle="Seguindo"
                            items={lista_comentarios}
                            />
                    </div>

                    <div className="vitrine-home">
                        <VitrineEntretenimentos
                            title={type == 'jogos' ? "Seleção de nacionais" : "Lançamentos nacionais"}
                            subtitle=""
                            items={lancamentos}
                            />
                    </div>

                    <div className="vitrine-home">
                        <VitrineEntretenimentos
                            title="Populares"
                            subtitle="Todos os populares"
                            items={popular}
                            />
                    </div>

                    <div className="vitrine-home">
                        <VitrineEntretenimentos
                            title="Melhor avaliados"
                            subtitle="Todos os melhores avaliados"
                            items={best}
                            />
                    </div>
                </div>
            </div>
        </div>
    ) 
}