import { Swiper, SwiperSlide } from "swiper/react"
import "./vitrineEntretenimentos.css"
import { Navigation } from "swiper/modules"
import { NavLink, useParams } from "react-router-dom"
import { Rating } from "@mui/material"
import { IoStar } from "react-icons/io5"



interface vitrineProps {
    title: string,
    subtitle: string,
    items: any[]
}

export default function VitrineEntretenimentos(props: vitrineProps) {
    const { type } = useParams();

    return (
        <div className="vitrine-container">
            <div className="vitrine-text">
                <h1 className="vitrine-title"> {props.title} </h1>
                <NavLink to={"/"} className={`vitrine-subtitle subtitle-${type}`}> {props.subtitle} </NavLink>
            </div>


            <Swiper
                spaceBetween={10}
                slidesPerView={10.5}
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
                        <NavLink to={`/${type}/${value.id}`} >
                            <div className={`vitrine-item-entertainment item-${type}`}>
                                <img src={value.img} className="image-item" />
                                <div className="entertainment-item-info">
                                    <p className="entertainment-item-title"> {value.title} </p>
                                        <Rating defaultValue={value.rating} precision={0.5} readOnly size="small"
                                        emptyIcon={<IoStar style={{ opacity: 1, height: 16 }} fontSize="inherit" />}/>
                                </div>
                            </div>
                        </NavLink>
                    </SwiperSlide>
                    
                )
            }

            </Swiper>

        </div>
    )
}