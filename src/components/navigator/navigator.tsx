import { BiMovie } from "react-icons/bi";
import { PiMonitorBold } from "react-icons/pi";
import { RiGamepadLine } from "react-icons/ri";
import './navigator.css'
import { NavLink } from "react-router-dom";


function Navigator() {
    return (
        <div className="navigator-container">
            <ul className="navigator-list">
                <NavLink className='item'to={'/'}>
                    <NavLink className={({ isActive }) => (isActive ? 'active-custom-movie' : 'inactive')} to={'/'} />
                    <BiMovie size={23}/> <p> Filmes </p> 
                </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'active-custom-serie' : 'inactive')} 
                    style={{ transition: '2s'}} to={'/series'} />
                    <NavLink className='item' to={'/series'}>
                    <PiMonitorBold size={23}/> <p> Séries </p> 
                </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'active-custom-game' : 'inactive')} to={'/jogos'} />
                    <NavLink className='item' to={'/jogos'}>
                    <RiGamepadLine size={23}/> <p> Jogos </p> 
                </NavLink>
            </ul>
        </div>
    );
}

export default Navigator;