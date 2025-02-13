import { useEffect, useState } from "react"
import { getEntertainmentGame, getEntertainmentMovie, getEntertainmentTV } from "../../utils/requests/requestEntertainment";
import { useParams } from "react-router-dom";

import { IoStar } from "react-icons/io5";
import { Rating } from "@mui/material";
import { FiPlus } from "react-icons/fi";

import Button from "../../components/button/button";
import Header from "../../components/header/header";

import "./Entertainment.css"
import ModalTemporada from "../../components/modals/modalTemporada";
import TmdbAxios from "../../api/tmdb/movieAPI";


interface entertainmentProps {
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

export default function Entertainment() {
    const { type, id } = useParams();
    const [entertainment,  setEntertainment] = useState<entertainmentProps>()
    const [open, setOpen] = useState(false)
    const [listEpisodes, setListEpisodes] = useState()
 
    async function getEntertainment() {
        if (type == "jogos") {
            const result = await getEntertainmentGame(id!)
            setEntertainment(result)
        }

        if (type == "filmes") {
            const result = await getEntertainmentMovie(id!)
            setEntertainment(result)
        }

        if (type == "series") {
            const result = await getEntertainmentTV(id!)
            setEntertainment(result)
        } 
    }

    async function getEpisodes(id: string, season: number) {
        const response = await TmdbAxios(`tv/${id}/season/${season}?language=pt-BR`)
        let result_query = response.data.episodes
        setListEpisodes(result_query)
        setOpen(true)
    }

    useEffect(() => {
        getEntertainment()
    }, [])

    useEffect(() => {
        getEntertainment();
    }, [type])

    useEffect(() => {
        getEntertainment();
    }, [id])    

    return (
        <div className="entertainment-container">
            <Header />

            <div className="entertainment-background"> 
                <img className="background-img" src={entertainment?.background}/> 
            </div>
            
            <div className="entertainment-infos">
                <div className="entertainment-poster"> 
                    <img className="poster-img" src={entertainment?.poster}/> 
                </div>

                <div className="entertainment-texts">
                    <div className="entertainment-title">
                        <h1> {entertainment?.title} </h1>
                        <Rating defaultValue={4} precision={0.5} readOnly size="large"
                                        emptyIcon={<IoStar style={{ opacity: 1, height: 28 }} fontSize="inherit" />}/>
                    </div>

                    <p className="entertainment-description"> {entertainment?.description} </p>
                </div>
            </div>

            <div className="entertainmnent-btns">
                <div className="btn-critic">
                    <Button
                        id="btn-critic"
                        textColor="white"
                        text="Adicionar Crítica"
                        backgroundColor="transparent"
                        border="white"
                        fontSize="small"
                        icon={<FiPlus />}
                        />
                </div>

                <div className="entertainment-genres">
                    {entertainment?.genres && (
                        <>
                        {entertainment.genres.map((genre: any) => 
                            <div className={`genre-container genre-${type}`}>
                                {genre.name}
                            </div>
                        )}
                        </>
                    )}
                </div>
            </div>

            {type == "jogos" && (
                <div className="entertainment-bar">
                    {entertainment?.plataformas && (
                        <div className="entertainment-plataformas">
                            <h1> Plataformas </h1>
                            <div className="plataformas-img">
                            { entertainment.plataformas.map((platform: any) =>     
                                <img className="plataforma-icon" src={platform}/>
                            )}
                            </div>
                        </div>
                    )}

                    {entertainment?.time_to_beat && (
                        <div className="entertainment-text-info">
                            <h1> Tempo de jogo </h1>
                            <p> {entertainment?.time_to_beat} </p>
                        </div>
                    )}

                    {entertainment?.platinum && (
                        <div className="entertainment-text-info">
                            <h1> Tempo de Platina </h1>
                            <p> {entertainment?.platinum} </p>
                        </div>
                    )}

                    {entertainment?.release && (
                        <div className="entertainment-text-info">
                            <h1> Ano de Lançamento </h1>
                            <p> {entertainment?.release} </p>
                        </div>
                    )}
                </div>
            )}

            {type == "filmes" && (
                <div className="entertainment-bar">
                    {entertainment?.country && (
                        <div className="entertainment-text-info">
                            <h1> País de origem </h1>
                            <p> {entertainment.country} </p>
                        </div>
                    )}

                    {entertainment?.runtime && (
                        <div className="entertainment-text-info">
                            <h1> Tempo de duração </h1>
                            <p> {entertainment.runtime} </p>
                        </div>
                    )}

                    {entertainment?.release && (
                        <div className="entertainment-text-info">
                            <h1> Data de lançamento </h1>
                            <p> {entertainment.release} </p>
                        </div>
                    )}
                </div>
            )}

            {type == "series" && (
                <div className="entertainment-bar">
                    {entertainment?.country && (
                        <div className="entertainment-text-info">
                            <h1> País de origem </h1>
                            <p> {entertainment.country} </p>
                        </div>
                    )}

                    {entertainment?.release && (
                        <div className="entertainment-text-info">
                            <h1> Data de lançamento </h1>
                            <p> {entertainment.release} </p>
                        </div>
                    )}

                    {entertainment?.numberSeason && (
                        <div className="entertainment-text-info">
                            <h1> Temporadas </h1>
                            
                            <div className="temporada-container">
                                {entertainment.numberSeason.map((temp) => 
                                    <div className="temporada" 
                                        onClick={() => (getEpisodes(id!, temp.id))}>
                                        {temp.name}
                                    </div>
                                )} 
                            </div>
                            
                        </div>
                    )}
                </div>
            )}
        
        <ModalTemporada 
            open={open}
            setOpen={setOpen}
            handleClose={() => setOpen(false)}
            listEpisodes={listEpisodes ? listEpisodes : []}
        />

        </div>
    )
}