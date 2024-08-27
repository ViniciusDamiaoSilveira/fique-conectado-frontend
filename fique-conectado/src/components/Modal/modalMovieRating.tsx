import { Box, Modal, Rating } from "@mui/material";
import colors from "../../utils/colors";
import InputDefault from "../Input/inputDefault";
import InputArea from "../Input/inputArea";
import ButtonDefault from "../Button/ButtonDefault";
import { UserLocalAxios } from "../../api/local/userAPI";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import RatingPost from "../../models/rating/ratingPost";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import RatingPut from "../../models/rating/ratingPut";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: colors.GreyComponent,
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    background: colors.GreyComponent,
    color: colors.GreyFont,
});

function ModalMovieRating({open, handleClose, rating, setRating, comment, setComment, edit, ratingId} : 
    {open: boolean, handleClose: any, rating: number, setRating: any, comment: string, setComment: any, edit?: boolean, ratingId?: string}) {
    
    const [token, setToken] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

    const { id } = useParams()

    async function addRating() {
        const user = jwtDecode<any>(token);
        const year = new Date().getFullYear()
        const month = new Date().getMonth()
        const day = new Date().getDate()
        let ratingPost: RatingPost = { userId: user.id, numRating: rating, comment: comment, entertainmentId: id!, date: new Date(year, month, day).toString() };

        try {
            setIsLoading(true)
            await UserLocalAxios('/Rating', 'POST', token, ratingPost);
            Toast.fire({
                icon: "success",
                title: "Crítica adicionada",
                willOpen: () => {
                    setIsLoading(false)
                },
                willClose: () => {
                    window.location.href = '/Filme/' + id
                }
              });

        } catch(ex: any) {
            Toast.fire({
                icon: "error",
                title: ex.response.data.message,
                willOpen: () => {
                    setIsLoading(false)
                }
              });
        }
        
    }

    async function editRating() {
        const user = jwtDecode<any>(token);
        const year = new Date().getFullYear()
        const month = new Date().getMonth()
        const day = new Date().getDate()
        let ratingPut: RatingPut = { ratingId: ratingId!, numRating: rating, comment: comment, date: new Date(year, month, day).toString() };
    
        console.log(ratingPut);
        
        const response = await UserLocalAxios('/Rating', 'PUT', token, ratingPut)
        console.log(response);
    }

    useEffect(() => {
        setToken(localStorage.getItem('Token')!);
    }, [])

    return (
        <Modal
            open={open}
            onClose={handleClose}>

            <Box sx={{ ...style}}>
                <h2 style={{ color: colors.White, fontSize: 28 }}>{!edit ? 'Adicionar' : 'Editar'} sua crítica</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <p style={{ fontSize: 23, color: colors.White, fontWeight: 'normal' }}> Sua nota: </p>
                    <Rating
                        size="large"
                        defaultValue={rating}
                        value={rating}
                        precision={0.5}
                        onChange={(event, newRating) => {
                            setRating(newRating);
                        }}
                    />
                </div>

                <div style={{ marginBottom: 25 }}>
                    <p style={{ fontSize: 23, color: colors.White, fontWeight: 'normal' }}>Comentário {'(opcional)'}</p>
                    <InputArea 
                        width={'100%'}
                        height={200}
                        borderRadius={1}
                        placeholder="Digite seu comentário..."
                        setValue={setComment}
                        value={comment}
                    />
                </div>

                    <ButtonDefault 
                        bgColor={colors.Yellow} 
                        width={'100%'} 
                        height={60} 
                        borderRadius={0} 
                        border={'2px solid ' + colors.Yellow}
                        onClick={() => ( !edit ? addRating() : editRating())}
                        text={edit ? 'Editar' : 'Adicionar'}  
                        fontSize={'15px'}
                        icon={false}
                        typeIcon=""
                        loading={isLoading}
                    />
            </Box>
        </Modal>
    )
}

export default ModalMovieRating;