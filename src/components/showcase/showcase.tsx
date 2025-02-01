import { useEffect, useState } from "react";
import TmdbAxios from "../../api/tmdb/movieAPI";
import { VITE_TMDB_IMG } from "../../utils/constants";
import { Swiper, SwiperSlide } from 'swiper/react';
import ShowcaseItem from "../showcaseItem/showcaseItem";
import MovieSearch from "../../models/movie/movieSearch";
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import './showcase.css';


function Showcase() {
    
    const [listMovies, setListMovies] = useState<MovieSearch[]>([])

    async function getListMovies() {
        const page = Math.floor(Math.random() * (35 - 1) + 1)
        const urlShowcase = `/movie/popular?language=pt-BR&page=${page}`
        const response = await TmdbAxios(urlShowcase)

        setListMovies(response.data.results);
    }

    useEffect(() => {
        getListMovies()
    }, [])
    
    return (
      <div className="showcase-container">
        <p className="showcase-title"> Apoie o nosso <strong> Brasil! </strong> </p>
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