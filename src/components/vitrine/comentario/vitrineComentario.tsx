import { NavLink, useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { VITE_TMDB_IMG } from "../../utils/constants";

import "./vitrineComentario.css"
import 'swiper/css';
import 'swiper/css/navigation';
import Comentario from "../../comentario/comentario";

interface vitrineProps {
    title: string,
    subtitle: string,
    items: any[]
}

export default function VitrineComentario(props: vitrineProps) {
    const { type } = useParams()

    return (
        <div className="vitrine-container">
            <div className="vitrine-text">
                <h1 className="vitrine-title"> {props.title} </h1>
                <NavLink className={`vitrine-subtitle subtitle-${type}`}> {props.subtitle} </NavLink>
            </div>


            <Swiper
                spaceBetween={10}
                slidesPerView={3.5}
                navigation={true}
                modules={[Navigation]}
                className="vitrine-swiper"
                autoplay={true}
                loop={true}
                init
            >
                
            {
                props.items.map((value) => 
                    <SwiperSlide>
                        <div className="vitrine-item">
                            <Comentario
                                id="asdjnasdjnas"
                                user="Vinícius Silveira"
                                typeEntertainment="Filmes"
                                entertainment="Oppenheimer"
                                comentario="Lorem ipsum dolor sit amet, consectetur adipiscing elit das asfsafasfasfag sdf afasf saf asfasfas fasdasdsafagsgasfasfgagagasasgagaggas"
                                rating={4.5}
                                views={10000}
                                
                            />
                        </div>
                    </SwiperSlide>
                    
                )
            }

            </Swiper>

        </div>
    )
}