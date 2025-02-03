import { Rating } from "@mui/material";

import "./comentario.css"
import { IoStar } from "react-icons/io5";

interface comentarioProps {
    id: string,
    user: string,
    rating: number,
    typeEntertainment: string,
    entertainment: string,
    comentario: string,
    views: number,
}

export default function Comentario(props: comentarioProps) {

    function formatViews(number: number) {
        return new Intl.NumberFormat('pt-BR').format(number);
    }

    function formatText(text: string): string {
        if (text.length > 130) {
            return text.substring(0, 130) + '...';
        }
        return text;
    }

    return (
        <div className="comentario-container">
            <div className="comentario-perfil">
                <div className="img-perfil"></div>
                
                <div className="comment-info">
                    <h1 className="user-name"> {props.user} </h1>
                    <p className={`entertainment-info ${props.typeEntertainment}`}> {props.typeEntertainment} - {props.entertainment} </p>
                </div>
            </div>

            <div className="comentario-text">
                {formatText(props.comentario)}
            </div>

            <div className="comentario-views">
                {`${formatViews(props.views)} visualizações`}
            </div>

            <div className="comentario-rating">
                <Rating defaultValue={props.rating} precision={0.5} readOnly 
                    emptyIcon={<IoStar style={{ opacity: 0.55 }} fontSize="inherit" />}/>
            </div>


        </div>
    )
}