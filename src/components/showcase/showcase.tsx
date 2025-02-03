import { useEffect, useState } from "react";
import TmdbAxios from "../../api/tmdb/movieAPI";
import { VITE_TMDB_IMG } from "../../utils/constants";
import { Swiper, SwiperSlide } from 'swiper/react';
import ShowcaseItem from "../showcaseItem/showcaseItem";
import MovieSearch from "../../models/movie/movieSearch";
import { Navigation } from 'swiper/modules';
import { useParams } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import './showcase.css';


function Showcase() {
    
    const [listMovies, setListMovies] = useState<MovieSearch[]>([])
    const { type } = useParams()

    async function getListMovies() {
        let type_query;
        if (type == 'series') type_query = 'tv'
        if (type == 'filmes') type_query = 'movie'

        const page = Math.floor(Math.random() * (35 - 1) + 1)
        const urlShowcase = `discover/${type_query}?include_adult=false&include_video=false&language=pt-BR&sort_by=popularity.desc&with_origin_country=BR&with_original_language=pt&page=${page}`
        const response = await TmdbAxios(urlShowcase)

        setListMovies(response.data.results);

        listMovies.map((movie) => {
          
        })
    }

    useEffect(() => {
        getListMovies()
    }, [])

    useEffect(() => {
      getListMovies()
  }, [type])
    
    return (
      <div className="showcase-container">
        <p className="showcase-title"> Apoie o nosso <strong className={`title-${type}`}> Brasil! </strong> </p>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          className="showcase"
          autoplay={true}
          init
        >
          { listMovies.map(movie => 
              <SwiperSlide key={movie.id}> <ShowcaseItem id={movie.id} width={'100%'} imgUrl={`${VITE_TMDB_IMG}${movie.poster_path}`} loading={false}/> </SwiperSlide>
          )}

          { listMovies.length == 0 && (
              <SwiperSlide> <ShowcaseItem id={null} width={'100%'} imgUrl={null} loading={true}/> </SwiperSlide>
          )}
        </Swiper>
      </div>
    );
}

export default Showcase;