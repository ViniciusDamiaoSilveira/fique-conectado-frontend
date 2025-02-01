import { useState } from 'react'
import Autocomplete from '../inputs/autocomplete/autocomplete'
import './header.css'

export default function Header() {
    const [searchMovie, setSearchMovie] = useState<string>('')

    return (
        <div className="header-container">
            <div className="logo">
                <span className='fique'> Fique </span> <span className='conectado'> Conectado</span>
            </div>

            <div className="search-bar">
                <Autocomplete value={searchMovie} setValue={setSearchMovie}/>
            </div>

            <div className="user-area">
                asdasdasdads
            </div>
        </div>
    )
}