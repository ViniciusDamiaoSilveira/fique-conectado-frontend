import colors from '../../utils/colors';
import { MdOutlineEmail, MdOutlinePhoneEnabled } from "react-icons/md";
import './inputDefault.css'
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { CiCalendarDate, CiSearch } from 'react-icons/ci';

function InputArea({width, height, placeholder, borderRadius, value, setValue} : 
    {width: string | number, height: string | number, placeholder: string, borderRadius?: string | number | null, icon?: boolean, 
     value: string, setValue: any}) {
    return (
        <div style={{ display: 'flex', alignItems: 'center'
        }}>
            <textarea
                placeholder={placeholder}
                style={{ 
                    backgroundColor: colors.GreyInput,
                    border: 'none',
                    outline: 'none',
                    color: colors.White,
                    width: width,
                    height: height,
                    fontSize: 18,
                    fontFamily: 'Lato',
                    paddingLeft: 15,
                    paddingTop: 15,
                    paddingRight: 15,
                    borderRadius: borderRadius != null ? borderRadius : 0,
                    resize: 'none'
                 }}
                value={value}
                onChange={(e) => {
                    setValue(e.currentTarget.value)
                }}
            />
            
        </div>
    )
}

export default InputArea;