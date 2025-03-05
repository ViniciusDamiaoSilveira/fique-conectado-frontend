import { NavLink, useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { VITE_TMDB_IMG } from "../../utils/constants";

import "./vitrineComentario.css"
import 'swiper/css';
import 'swiper/css/navigation';
import Comentario from "../../comentario/comentario";
import { useEffect, useState } from "react";
import { UserLocalAxios } from "../../../api/local/userAPI";

interface vitrineProps {
    title: string,
    subtitle: string,
}

interface comentarioProps {
    id: string,
    userId: string,
    numRating: number,
    typeEntertainment: string,
    entertainmentName: string,
    entertainmentId: string,
    comment: string,
    views: number,
    date: string,
    size?: string,
}

export default function VitrineComentario(props: vitrineProps) {
    const { type } = useParams();
    const [comments, setComments] = useState<comentarioProps[]>([])

    async function getCommentsWeek() {
        let response = await UserLocalAxios(`Rating/weekly/${type}`, "GET", "")
        setComments(response?.data)
    }

    useEffect(() => {
        getCommentsWeek();
    }, [])

    useEffect(() => {
        getCommentsWeek();
    }, [type])

    return (
        <div className="vitrine-container">
            <div className="vitrine-text">
                <h1 className="vitrine-title"> {props.title} </h1>
            </div>

            {comments.length > 0 ? (
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
                        comments.map((value) => 
                            <SwiperSlide>
                                <div className="vitrine-item">
                                    <Comentario
                                        id={value.id}
                                        userId={value.userId}
                                        entertainmentId={value.entertainmentId}
                                        typeEntertainment={value.typeEntertainment}
                                        entertainment={value.entertainmentName}
                                        comentario={value.comment}
                                        rating={value.numRating}
                                        views={value.views}
                                    />
                                </div>
                            </SwiperSlide>
                            
                        )
                    }   
                </Swiper>
            ) : (
                <div className="no-comment-vitrine">
                    Venha fazer história em nossos comentários destaques!
                </div>    
            )}

        </div>
    )
}