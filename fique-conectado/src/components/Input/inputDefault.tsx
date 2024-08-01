import colors from '../../utils/colors';
import { MdOutlineEmail, MdOutlinePhoneEnabled } from "react-icons/md";
import './inputDefault.css'
import { RiLockPasswordLine } from 'react-icons/ri';
import { FormEventHandler } from 'react';
import { FaRegUser } from 'react-icons/fa';

function InputDefault({type, width, height, placeholder, icon, typeIcon, value, setValue} : 
    {type: string, width: string | number, height: string | number, placeholder: string, icon?: boolean, 
     typeIcon: string, value: string, setValue: any}) {
    return (
        <div style={{ display: 'flex', alignItems: 'center'
        }}>
            <input
                type={type}
                placeholder={placeholder}
                style={{ 
                    backgroundColor: colors.GreyInput,
                    border: 'none',
                    outline: 'none',
                    color: colors.White,
                    width: width,
                    height: height,
                    fontSize: 15,
                    paddingLeft: 15
                 }}
                value={value}
                onChange={(e) => {
                    setValue(e.currentTarget.value)
                }}
            />

            { icon == true  && typeIcon == 'email' && (
                <div style={{ position: 'absolute', marginLeft: `calc(${width}px - 20px)`}}>
                    <MdOutlineEmail size={20} color={colors.GreyFont}/>
                </div>
            )}
            
            { icon == true  && typeIcon == 'password' && (
                <div style={{ position: 'absolute', marginLeft: `calc(${width}px - 20px)`}}>
                    <RiLockPasswordLine size={20} color={colors.GreyFont}/>
                </div>
            )}

            { icon == true  && typeIcon == 'user' && (
                <div style={{ position: 'absolute', marginLeft: `calc(${width}px - 20px)`}}>
                    <FaRegUser size={20} color={colors.GreyFont}/>
                </div>
            )}

            { icon == true  && typeIcon == 'phone' && (
                <div style={{ position: 'absolute', marginLeft: `calc(${width}px - 20px)`}}>
                    <MdOutlinePhoneEnabled size={20} color={colors.GreyFont}/>
                </div>
            )}
            
        </div>
    )
}

export default InputDefault;