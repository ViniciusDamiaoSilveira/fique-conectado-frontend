import { Box, Modal, Rating } from "@mui/material";
import colors from "../../utils/colors";
import InputArea from "../Input/inputArea";
import ButtonDefault from "../Button/ButtonDefault";
import { useEffect, useState } from "react";
import ListUser from "../../models/list/ListUser";
import { UserLocalAxios } from "../../api/local/userAPI";
import UserProfile from "../../models/user/userProfile";
import { jwtDecode } from "jwt-decode";
import UserList from "../UserList/userList";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: colors.GreyComponent,
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

function ModalMovieList({open, handleClose} : 
    {open: boolean, handleClose: any, rating: number, comment: string, setRating: any, setComment: any}) {
    
    const  [listUser, setListUser] = useState<ListUser[]>();
    const  [userProfile, setUserProfile] = useState<UserProfile>();

    function getUser() {
        const user = jwtDecode<any>(localStorage.getItem('Token')!)
        setUserProfile(user)
        getLists(user, localStorage.getItem('Token')!)
    }

    async function getLists(userProfile: UserProfile, token: string) {
        const response = await UserLocalAxios(`/List/user/${userProfile?.id}`, 'GET', token);
        setListUser(response?.data)
    }

    useEffect(() => {
        getUser()
    }, [])
    
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
            <Box sx={{ ...style}}>
                <h2 id="parent-modal-title" style={{ color: colors.White }}>Adicionar em uma lista </h2>
                    <div>
                        { listUser?.map(movie => 
                            <UserList key={movie.id} title={movie.name} icon={movie.name} type={movie.typeList}/>
                        )}
                    </div>
                    
                    <div style={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'end',
                        marginTop: 30
                        }}>
                        <ButtonDefault 
                            bgColor={colors.Yellow} 
                            width={130} 
                            height={40} 
                            borderRadius={0} 
                            border={'2px solid ' + colors.Yellow}
                            onClick={null}
                            text={'Adicionar'}  
                            fontSize={'15px'}
                            icon={false}
                            typeIcon=""
                        />
                    </div>
            </Box>
        </Modal>
    )
}

export default ModalMovieList;