import { Box, Modal, Rating } from "@mui/material";
import { useEffect } from "react";

import "./modalComentario.css"
import { IoStar } from "react-icons/io5";

interface modalProps {
    open: boolean,
    setOpen: any,
    handleClose: any,
    id: string,
    userName: string,
    entertainmentType: string,
    entertainmentName: string,
    comment: string,
    numRating: number
    views: number,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: "fit-content",
    bgcolor: "#1F1F1F",
    boxShadow: 24,
    pt: 4,
    px: 4,
    pb: 3,
    outline: "none"
};

export default function ModalComentario(props: modalProps) {

    function formatViews(number: number) {
        return new Intl.NumberFormat('pt-BR').format(number);
    }

    return (
        <Modal
           open={props.open}
            onClose={props.handleClose}
            onBlur={props.handleClose}
            >
            <Box sx={{ ...style, color: "white"}}>
                <div className="modal-comentario-container">
                    <div className="modal-user">
                        <div className="img-perfil-modal"></div>
                        <div className="perfil-modal">
                            <h1 className="username-modal"> {props.userName} </h1>
                            <p className={`entertainment-modal ${props.entertainmentType}`}> 
                                {props.entertainmentType.charAt(0).toUpperCase() + props.entertainmentType.slice(1)} - {props.entertainmentName} </p>
                        </div>
                    </div>

                    <div className="comentario-modal">
                        <p> {props.comment} </p>
                    </div>

                    <div className="views-modal">
                        {`${formatViews(props.views)} visualizações`}
                    </div>

                    <div className="num-rating-modal">
                        <Rating defaultValue={props.numRating} precision={0.5} readOnly 
                            emptyIcon={<IoStar style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}