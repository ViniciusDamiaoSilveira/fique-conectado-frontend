import { Box, Modal } from "@mui/material";
import "./modalTemporada.css"
import { MdHeight } from "react-icons/md";
import { VITE_TMDB_IMG } from "../../utils/constants";
import NotFoundEpisode from "../../images/NotFoundEpisode.svg"

interface modalProps {
    open: boolean,
    setOpen: any,
    handleClose: any,
    listEpisodes: any[]
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 750,
    bgcolor: "#1F1F1F",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    outline: "none"
};

export default function ModalTemporada(props: modalProps) {

    function formatText(text: string): string {
        if (text.length > 205) {
            return text.substring(0, 205 ) + '...';
        }
        return text;
    }    

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}>
            <Box sx={{ ...style, color: "white"}}>
                <h1 className="title-modal"> Lista de episódios </h1>

                <div className="list-episodes">
                    {props.listEpisodes.map((ep: any) => 
                        <div className="episode">
                            <div className="episode-poster">
                                <img className="img-episode" src={ep.still_path ? `${VITE_TMDB_IMG}${ep.still_path}` : NotFoundEpisode} alt="" />
                            </div>

                            <div className="episode-text">
                                <h1 className="episode-title"> {ep.name} </h1>
                                <p> {ep.overview ? formatText(ep.overview) : "Sem descrição."} </p>
                            </div>
                        </div>
                    )}
                </div>
            </Box>
        </Modal>
    )
}