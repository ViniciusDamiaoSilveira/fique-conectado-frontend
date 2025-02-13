import Nintendo from "../images/Nintendo-icon.png";
import Other from "../images/Other-icon.png";
import Linux from "../images/Linux-icon.png";
import Sega from "../images/Sega-icon.png";
import Sony from "../images/Sony-icon.png";
import Xbox from "../images/Xbox-icon.png";
import PC from "../images/PC-icon.png";


export function getPlatformLogo(id: number) {
    switch (id) {
        case 1:
            return Sony;
        case 2:
            return Xbox;
        case 3:
            return Sega;
        case 4:
            return Linux;
        case 5:
            return Nintendo;
        case 6: 
            return PC;
        default:
            return Other
    }
}