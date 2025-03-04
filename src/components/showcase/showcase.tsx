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
import { getShowcase } from "../../utils/requests/requestShowcase";

interface entertainmentProps {
  id: string,
  img: string,
}

function Showcase() {
    
    const [listMovies, setListMovies] = useState<entertainmentProps[]>([])
    const { type } = useParams()

    async function getListMovies() {
      const results = await getShowcase(type!);      
      setListMovies(results);
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
              <SwiperSlide key={movie.id}> <ShowcaseItem id={movie.id} width={'100%'} imgUrl={movie.img} loading={false}/> </SwiperSlide>
          )}

          { listMovies.length == 0 && (
              <SwiperSlide> <ShowcaseItem id={null} width={'100%'} imgUrl={null} loading={true}/> </SwiperSlide>
          )}
        </Swiper>
      </div>
    );
}

export default Showcase;