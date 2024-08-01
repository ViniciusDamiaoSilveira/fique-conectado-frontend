import colors from "../../utils/colors";
import './ButtonDefault.css'

function ButtonDefault({width, height, text, bgColor, fontSize, 
    border, icon, typeIcon, onClick, disabled, loading = false} : 
    {width: string | number, height: string | number,text: string, bgColor: string, 
        fontSize: string, border: string | null, icon: boolean, typeIcon?: string, 
        onClick: any, disabled?: boolean, loading?: boolean}) {
    return (
        <div>
            <button 
            id={bgColor == colors.Yellow ? 'yellowBtn' : 'noColorBtn'}
            style={{
                    width: width,
                    height: height,
                    border: border != null ? border : 'none',
                    cursor: "pointer",
                    fontSize: fontSize,
                    transition: '0.5s',
                    borderRadius: 5
                }}
                onClick={disabled ? null : onClick}
                disabled={disabled}>
                {text} 
            </button>
        </div>
    );
}

export default ButtonDefault;