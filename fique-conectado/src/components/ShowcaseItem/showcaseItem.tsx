import { ClipLoader } from "react-spinners";
import colors from "../../utils/colors";
import './showcaseItem.css'
import { NavLink } from "react-router-dom";

function ShowcaseItem({id, imgUrl, width, loading} : {id: string | null, imgUrl: string | null, width: string | number, loading: boolean}) {
    return (
        <NavLink to={`/Filme/${id}`}
        className="showcase-item"
        style={{
            height: 400,
            width: width,
            display: 'flex',
            alignItems: 'center',
            transition: '0.5s',
            borderRadius: 50,
            position: "relative",
        }}>
           { !loading && (
                <div
                className="img-item"
                style={{
                    backgroundImage: imgUrl ? `url(${imgUrl})` : 'url()',
                    backgroundColor: !imgUrl ? colors.Black : '',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: 400,
                    width: width,
                    borderRadius: 15
                }}/>
           )}

           { loading && (
                <div style={{
                    height: 400,
                    width: width,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15
                }}>
                    <ClipLoader
                        color="#FFFFFF"
                        size={30}
                        speedMultiplier={0.6}
                        /> 
                </div>
           )}
        </NavLink>
    );
}

export default ShowcaseItem;
