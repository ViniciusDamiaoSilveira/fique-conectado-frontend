import { useEffect, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import Autocomplete from "../Input/inputAutoComplete";
import { NavLink } from "react-router-dom";
import ButtonDefault from "../Button/ButtonDefault";
import Logo from "../Logo/logo";
import colors from "../../utils/colors";
import './header.css'

function Header() {
    const [searchMovie, setSearchMovie] = useState<string>('')
    const [isLogged, setIsLogged] = useState<Boolean>(false)

    useEffect(() => {
        if (localStorage.getItem('Token')) {
            setIsLogged(true)
        }
    }, [])
    
    return (
        <div style={{ width: '100%', height: 100, display: 'flex', justifyContent: "space-between", alignItems: "center"}}> 
            
            <Logo />
            <Autocomplete value={searchMovie} setValue={setSearchMovie}/>

            {isLogged && (
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 25, gap: 30}}>
                    <MdOutlineGroupAdd size={30} color={colors.GreyInput} />
                    <NavLink 
                        id='profile'
                        to={'/profile'} 
                        style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: colors.GreyInput}}> </NavLink>
                </div>
            )}

            { !isLogged && (
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 25, gap: 30}}>
                    <ButtonDefault width={150} height={40} bgColor={colors.Yellow} 
                        text="Login" fontSize="16px" border={null} icon={false} borderRadius={0}
                        onClick={() =>  window.location.href = 'login'} />

                    <ButtonDefault width={150} height={40} bgColor={'transparent'} 
                        text="Cadastrar" fontSize="16px" border={'1px solid' + colors.Yellow} icon={false} borderRadius={0}
                        onClick={() =>  window.location.href = 'register'} />
                </div>
            )}

        </div>
    );
}

export default Header;