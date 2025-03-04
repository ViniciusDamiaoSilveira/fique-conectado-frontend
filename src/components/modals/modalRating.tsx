import { Box, Modal, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";

import "./modalRating.css"
import Button from "../button/button";
import { useParams } from "react-router-dom";
import RatingPost from "../../models/rating/ratingPost";
import { format } from "date-fns";
import { UserLocalAxios } from "../../api/local/userAPI";
import Swal from "sweetalert2";
import RatingPut from "../../models/rating/ratingPut";

interface modalProps {
    open: boolean,
    setOpen: any,
    handleClose: any,
    comment: string,
    rating: number
    type: string,
    entertainmentName: string,
    commentId?: string,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 540,
    bgcolor: "#1F1F1F",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    outline: "none"
};

export default function ModalRating(props: modalProps) {
    const { type, id } = useParams();
    const [value, setValue] = useState<number>(0)
    const [comment, setComment] = useState<string>("")
    const [color, setColor] = useState("#FFBF15")    

    useEffect(() => {
        if (type == "filmes") setColor("yellow")
        if (type == "series") setColor("blue")
        if (type == "jogos") setColor("green")
    }, [])

    useEffect(() => {
        setValue(props.rating)
        setComment(props.comment)
    }, [props])

    async function addRating() {
        const userId = "8c4cbab5-0275-409a-9b84-07cf49623bed"
        let body: RatingPost = {
            comment: comment,
            entertainmentId: id!,
            entertainmentName: props.entertainmentName,
            numRating: value,
            userId: userId,
            date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
            typeEntertainment: type!,
        }

        let response = await UserLocalAxios("Rating", "POST", "", body)
        
        props.setOpen(false)

        Swal.fire({
            title: response?.data.message,
            icon: "success",
            background: "#3A3A3A",
            color: "#FFFFFF",
            confirmButtonColor: "#228B22",
        }).then(() => {
            window.location.reload()
        });
    }

    async function editRating() {
        let body: RatingPut = {
            ratingId: props.commentId!,
            comment: comment,
            numRating: value,
            date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
        }

        let response = await UserLocalAxios("Rating", "PUT", "", body)
        
        props.setOpen(false)

        Swal.fire({
            title: response?.data.message,
            icon: "success",
            background: "#3A3A3A",
            color: "#FFFFFF",
            confirmButtonColor: "#228B22",
        }).then(() => {
            window.location.reload()
        });
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}>
            <Box sx={{ ...style, color: "white"}}>
                <div className="modal-rating-container">
                    <h1 className="title-rating-modal"> Faça sua crítica </h1>

                    <div className="rating-modal">
                        <p> Sua nota: </p>
                        <Rating defaultValue={props.rating} precision={0.5} value={value} size="large"
                            onChange={(event, newValue) => {
                                setValue(newValue!);
                            }}
                            emptyIcon={<IoStar style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                    </div>

                    <div className="comment-modal">
                        <p> Seu comentário </p>

                        <textarea value={comment} onChange={(e) => (setComment(e.target.value))}/>
                    </div>

                    <div className="button-rating"> 
                            <Button 
                                backgroundColor={color}
                                border="none"
                                fontSize="medium"
                                text={props.type == "adicionar" ? "Adicionar" : "Editar"}
                                textColor="white"
                                id="btn-add-rating"
                                onClick={() => {
                                    if (props.commentId) {
                                        editRating()
                                    } else {
                                        addRating()
                                    }
                                }}
                            />
                    </div>
                </div>
            </Box>
        </Modal>
    )
}