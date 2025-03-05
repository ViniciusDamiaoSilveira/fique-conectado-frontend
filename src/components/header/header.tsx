import { useEffect, useState } from 'react'
import Autocomplete from '../inputs/autocomplete/autocomplete'
import './header.css'
import { NavLink, useParams } from 'react-router-dom'
import { FaUserFriends } from 'react-icons/fa'
import { jwtDecode } from "jwt-decode";
import { LOCAL_IMG } from '../../utils/constants'

import profilePic from "../../images/userPic.png"
import { RiLogoutBoxLine } from 'react-icons/ri'
import Swal from 'sweetalert2'
import { UserLocalAxios } from '../../api/local/userAPI'

interface userProps {
    id: string,
    username: string,
    email: string,
    profilePic: string,
}

export default function Header() {
    const { type } = useParams()
    const [searchMovie, setSearchMovie] = useState<string>('')
    const [user, setUser] = useState<userProps>()

    async function getUser(id: string) {
        let response = await UserLocalAxios(`User/${id}`, "GET", "")
        setUser(response?.data)
    }

    useEffect(() => {
        if (localStorage.getItem("Token")) {
            const token = localStorage.getItem("Token");
            const decode = jwtDecode<userProps>(token!)
            getUser(decode.id)
        }
    }, [])

    function Logout() {
        Swal.fire({
            title: "Deseja fazer logout?",
            showCancelButton: true,
            confirmButtonText: "Sair",
            cancelButtonText: `Cancelar`,
            background: "#3A3A3A",
            color: "#ffffff",
            confirmButtonColor: "#8B2626",
            width: 400
            }).then(async (result: any) => {
                if (result.isConfirmed) {
                    localStorage.setItem("Token", "")
                    window.location.href = "/login"
                }
            })
    }

    return (
        <div className="header-container">
            <NavLink to={`/${type ? type : "filmes"}`} className="logo">
                <span className='fique'> Fique </span> <span className={`conectado-${type}`}> Conectado</span>
            </NavLink>

            {type && (
                <div className="search-bar">
                    <Autocomplete value={searchMovie} setValue={setSearchMovie}/>
                </div>
            )}

            {user ? (
                <div className="user-area">
                    <NavLink to={'/pesquisar-usuarios'}> <FaUserFriends color='#3a3a3a' size={30}/> </NavLink>
                    <NavLink to={`/perfil/${user.id}`}> <img src={user?.profilePic ? `${LOCAL_IMG}${user.profilePic}` : profilePic} alt="" /> </NavLink>
                    <RiLogoutBoxLine style={{ cursor: 'pointer' }} onClick={Logout} color='#3a3a3a' size={30}/>
                </div>
            ) : (
                <div className='login-home'>
                    <NavLink to={"/login"}> <p className='login-text'> Login </p> </NavLink> 

                    <NavLink to={"/cadastro"} className='cadastro-text'>
                        Cadastre-se
                    </NavLink>
                </div>
            )}
        </div>
    )
}