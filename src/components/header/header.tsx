import { useState } from 'react'
import Autocomplete from '../inputs/autocomplete/autocomplete'
import './header.css'
import { NavLink, useParams } from 'react-router-dom'

export default function Header() {
    const { type } = useParams()
    const [searchMovie, setSearchMovie] = useState<string>('')

    return (
        <div className="header-container">
            <NavLink to={`/${type}`} className="logo">
                <span className='fique'> Fique </span> <span className={`conectado-${type}`}> Conectado</span>
            </NavLink>

            <div className="search-bar">
                <Autocomplete value={searchMovie} setValue={setSearchMovie}/>
            </div>

            <div className="user-area">
                asdasdasdads
            </div>
        </div>
    )
}