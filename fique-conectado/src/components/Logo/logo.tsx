import colors from "../../utils/colors"
import './logo.css'

function Logo() {
    return (
        <div>
            <p style={{ color: colors.White, fontSize: 25, width: 'fit-content', marginLeft: 25, cursor: "pointer"}}>
                Fique
                <span style={{ color: colors.Yellow }}>
                    Conectado
                </span>
            </p>
        </div>
    )
}

export default Logo;