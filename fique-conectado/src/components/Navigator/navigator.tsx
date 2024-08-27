import { BiMovie } from "react-icons/bi";
import { PiMonitorBold } from "react-icons/pi";
import { RiGamepadLine } from "react-icons/ri";
import colors from "../../utils/colors";
import './navigator.css'
import { NavLink } from "react-router-dom";


function Navigator() {
    return (
        <div style={{ backgroundColor: colors.GreyComponent, width: '100%', height: 250, borderRadius: 15, boxShadow: '#000000 0px 0px 0.1px, #000000 0px 3px 6px', marginLeft: 20}}>
            <ul className="navigatorList" 
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', listStyle: "none", padding: 0, margin: 0 ,gap: 12}}>
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