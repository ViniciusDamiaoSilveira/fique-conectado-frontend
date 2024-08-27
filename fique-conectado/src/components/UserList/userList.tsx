import { FaRegClock, FaRegStar } from "react-icons/fa";
import colors from "../../utils/colors";
import { FiHeart } from "react-icons/fi";
import { useEffect } from "react";
import './userList.css'

function UserList({title, icon, type} : {title: string, icon?: string, type: string}) {
    
    if (icon == 'Favoritos' || icon == 'Salvos' || icon == 'Classificados') {
        type = 'Filmes, séries e jogos' 
    }

    useEffect(() => {
        if (icon != 'Favoritos' && icon != 'Salvos' && icon != 'Classificados') {
           type = icon!
        }
    }, [])

    return (
        <div
        className="lista" 
        style={{ width: '100%', height: 80, display: 'flex', alignItems: 'center', gap: 15, borderBottom: '2px solid white', transition: '0.5s'}}>
            { icon == 'Favoritos' && (
                <div style={{ width: 45, height: 45, backgroundColor: '#8b2626',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <FiHeart   color="#e06e6e" size={25}/>
                </div>
            )}

            { icon == 'Salvos' && (
                <div style={{ width: 45, height: 45, backgroundColor: '#1b315c',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <FaRegClock color="#5e7dbb" size={25}/>
                </div>
            )}

            { icon == 'Classificados' && (
                <div style={{ width: 45, height: 45, backgroundColor: '#bc9301',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <FaRegStar   color="#fae266" size={25}/>
                </div>
            )}

            

            <div>
                <p style={{ fontSize: 20, color: colors.White, fontWeight: 'bold', marginBottom: 0 }}>{title}</p>
                <p style={{ fontSize: 18, color: colors.White, fontWeight: 'normal', marginTop: 0, fontStyle: 'italic' }}> {type}</p>  
            </div>
        </div>
    );
}

export default UserList;