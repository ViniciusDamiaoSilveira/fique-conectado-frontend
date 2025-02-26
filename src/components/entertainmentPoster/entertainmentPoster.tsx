import { Rating } from "@mui/material"
import "./entertainmentPoster.css"
import { IoStar } from "react-icons/io5"
import { NavLink, useParams } from "react-router-dom"

interface posterProps {
    id: string,
    name: string,
    poster: string,
    rating: number,
}

export default function EntertainmentPoster(props: posterProps) {
    const { type } = useParams()

    return (
        <NavLink to={`/${type}/${props.id}`} className="poster-container">
            <img className="entertainment-poster-img" src={props.poster} alt="poster" />

            <h1 className="poster-name"> { props.name } </h1>

            <Rating size="small" defaultValue={props.rating} precision={0.5} readOnly 
                emptyIcon={<></>}/>
        </NavLink>
    )
}