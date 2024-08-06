import { useState } from "react";
import InputDefault from "../Input/inputDefault";
import Logo from "../Logo/logo";
import colors from "../../utils/colors";
import { MdOutlineGroupAdd } from "react-icons/md";
import UseAutocomplete from "../Input/inputAutoComplete";

function Header() {
    const [searchMovie, setSearchMovie] = useState<string>('')

    console.log(searchMovie);
    


    return (
        <div style={{ width: '100%', height: 100, display: 'flex', justifyContent: "space-between", alignItems: "center"}}> 
            <Logo />

            {/* <InputDefault width={300} height={40} type="text" placeholder="Pesquisar..." borderRadius={4} icon={true} 
            typeIcon="search" setValue={setSearchMovie} value={searchMovie}/> */}
            <UseAutocomplete value={searchMovie} setValue={setSearchMovie}/>

            <div style={{ display: 'flex', alignItems: 'center', marginRight: 25, gap: 30}}>
                <MdOutlineGroupAdd size={30} color={colors.GreyInput} />
                <div style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: colors.GreyInput}}> </div>
            </div>

        </div>
    );
}

export default Header;