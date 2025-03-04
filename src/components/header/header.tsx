import { useState } from 'react'
import Autocomplete from '../inputs/autocomplete/autocomplete'
import './header.css'
import { NavLink, useParams } from 'react-router-dom'
import { FaUserFriends } from 'react-icons/fa'

export default function Header() {
    const { type } = useParams()
    const [searchMovie, setSearchMovie] = useState<string>('')

    return (
        <div className="header-container">
            <NavLink to={`/${type ? type : "filmes"}`} className="logo">
                <span className='fique'> Fique </span> <span className={`conectado-${type}`}> Conectado</span>
            </NavLink>

            <div className="search-bar">
                <Autocomplete value={searchMovie} setValue={setSearchMovie}/>
            </div>

            <div className="user-area">
                <NavLink to={'/search-users'}> <FaUserFriends color='#3a3a3a' size={30}/> </NavLink>
                <img src="https://lh3.googleusercontent.com/a/ACg8ocLRSHYtUGl6F5IysvxZL1DIegRF-baez1S_fJvjFjF6Be1QDg_C=s288-c-no" alt="" />
            </div>
        </div>
    )
}