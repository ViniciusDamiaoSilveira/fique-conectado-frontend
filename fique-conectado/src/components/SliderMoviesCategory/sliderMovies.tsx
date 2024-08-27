import { useEffect, useState } from "react";
import "./sliderMovies.css";
import TmdbAxios from "../../api/tmdb/movieAPI";
import { VITE_TMDB_IMG } from "../../utils/constants";
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderItem from "../SlideItem/sliderItem";
import 'swiper/css';
import colors from "../../utils/colors";
import { NavLink } from "react-router-dom";

function Slider() {
    const [firstImage, setFirstImage] = useState<string>('');
    const [secondImage, setSecondImage] = useState<string>('');
    const [thirdImage, setThirdImage] = useState<string>('');


    useEffect(() => {
        callAPI()
    }, [firstImage, secondImage, thirdImage])

    async function callAPI() {
        const urlUpcoming = `/movie/upcoming?language=pt-BR&page=1`
        const responseUpcoming = await TmdbAxios(urlUpcoming)
        setFirstImage(responseUpcoming.data.results[0].poster_path);   
        
        const urlPopular = `/trending/movie/week?language=pt-BR`
        const responsePopular = await TmdbAxios(urlPopular) 
        setSecondImage(responsePopular.data.results[1].poster_path);   


        const urlTop = `/movie/top_rated?language=pt-BR&page=1`
        const responseTop = await TmdbAxios(urlTop)
        setThirdImage(responseTop.data.results[0].poster_path);   

    }

  return (
    <div style={{ width: 'calc(100vw - 330px)',  height: 180, display: "flex", marginRight: 30}}>
      <Swiper
        spaceBetween={20}
        slidesPerView={3.4}
        navigation={true}
        className="slider"
      >
        <SwiperSlide> <NavLink to={'/Filmes/Estreias'}> <SliderItem width={'100%'} text="Estreias" imgUrl={VITE_TMDB_IMG + firstImage}/> </NavLink> </SwiperSlide>
        <SwiperSlide> <NavLink to={'/Filmes/Populares'}> <SliderItem width={'100%'} text="Populares" imgUrl={VITE_TMDB_IMG + secondImage}/> </NavLink> </SwiperSlide>
        <SwiperSlide> <NavLink to={'/Filmes/Melhores'}> <SliderItem width={'100%'} text="Melhores avaliados" imgUrl={VITE_TMDB_IMG + thirdImage}/> </NavLink> </SwiperSlide>
        <SwiperSlide> <NavLink to={'/Filmes/Categorias'}> <SliderItem width={'100%'} text="Categorias" imgUrl={null}/> </NavLink> </SwiperSlide>
        ...
      </Swiper>
    </div>
  );
};
export default Slider;
