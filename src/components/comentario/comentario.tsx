import { Rating } from "@mui/material";

import "./comentario.css"
import { IoStar } from "react-icons/io5";
import { useEffect, useState } from "react";
import ModalComentario from "../modals/modalComentario";
import { UserLocalAxios } from "../../api/local/userAPI";
import { LOCAL_IMG } from "../../utils/constants";

import UserPic from "../../images/userPic.png"

interface comentarioProps {
    id: string,
    userId: string,
    rating: number,
    typeEntertainment: string,
    entertainment: string,
    comentario: string,
    views: number,
    size?: string,
    format?: boolean,
}

interface userProps {
    id: string,
    username: string,
    profilePic: string | null
}

function formatText(text: string): string {
    if (text.length > 130) {
        return text.substring(0, 130) + '...';
    }
    return text;
}

export default function Comentario(props: comentarioProps) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [user, setUser] = useState<userProps>()

    function formatViews(number: number) {
        return new Intl.NumberFormat('pt-BR').format(number);
    }

    async function increaseView() {
        await UserLocalAxios(`Rating/${props.id}`, "PUT", "")
    }

    async function getUser() {
        let response = await UserLocalAxios(`User/${props.userId}`, "GET", "")
        setUser(response?.data)
    }

    useEffect(() => {
        getUser();
    }, [props])

    return (
        <div className={`comentario-container comentario-${props.size}`}
            onClick={() => {
                setOpenModal(true);
                increaseView()
            }}>
            <div className="comentario-perfil">
                <img src={user?.profilePic ? `${LOCAL_IMG}${user.profilePic}` : UserPic} className="img-perfil" /> 
                
                <div className="comment-info">
                    <h1 className="user-name"> {user?.username} </h1>
                    <p className={`entertainment-info ${props.typeEntertainment}`}> 
                        {props.typeEntertainment.charAt(0).toUpperCase() + props.typeEntertainment.slice(1)} - {props.entertainment} </p>
                </div>
            </div>

            <div className="comentario-text">
                {props.format ? formatText(props.comentario) : props.comentario} 
            </div>

            <div className="comentario-views">
                {`${formatViews(props.views)} visualizações`}
            </div>

            <div className="comentario-rating">
                <Rating defaultValue={props.rating} precision={0.5} readOnly 
                    emptyIcon={<IoStar style={{ opacity: 0.55 }} fontSize="inherit" />}/>
            </div>

            <ModalComentario 
                open={openModal}
                setOpen={setOpenModal}
                handleClose={() => setOpenModal(false)}
                id={props.id}
                userName={user?.username!}
                entertainmentType={props.typeEntertainment}
                entertainmentName={props.entertainment}
                comment={props.comentario}
                numRating={props.rating}
                views={props.views}
            />

        </div>
    )
}