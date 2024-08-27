import { ClipLoader } from "react-spinners";
import colors from "../../utils/colors";
import './ButtonDefault.css'
import { BiPlus } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

function ButtonDefault({width, height, text, bgColor, fontSize, 
    border, icon, typeIcon, borderRadius,onClick, disabled, loading = false,} : 
    {width: string | number, height: string | number,text: any, bgColor: string, 
        fontSize: string, border: string | null, icon: boolean, typeIcon?: string,
        borderRadius?: number 
        onClick: any, disabled?: boolean, loading?: boolean}) {
    return (
        <div>
            <button 
            id={bgColor == colors.Yellow ? 'yellowBtn' : 'noColorBtn'}
            style={{
                    width: width,
                    height: height,
                    display: 'flex',
                    gap: 5,
                    alignItems: 'center',
                    border: border != null ? border : 'none',
                    cursor: "pointer",
                    fontSize: fontSize,
                    transition: '0.5s',
                    justifyContent: 'center',
                    backgroundColor: bgColor == colors.Yellow && loading == true ? '#fdce4b' : bgColor,
                    borderRadius: borderRadius != null ? borderRadius : 5 
                }}
                onClick={disabled ? null : onClick}
                disabled={disabled}>
                { loading && (
                    <ClipLoader
                    color={colors.Black}
                    size={13}
                    speedMultiplier={0.6}
                    /> 
                )}
                { typeIcon == 'plus' && (
                    <FiPlus size={18}/>
                )}
                { typeIcon == 'list' && (
                    <CiBookmark size={18}/>
                )}
                { typeIcon == 'edit' && (
                    <FaRegEdit size={18}/>
                )}


                {text} 
                
                
            </button>
        </div>
    );
}

export default ButtonDefault;