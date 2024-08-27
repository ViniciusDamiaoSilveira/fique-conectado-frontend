import { Rating } from "@mui/material";
import colors from "../../utils/colors";
import ButtonDefault from "../Button/ButtonDefault";

function MovieInformations({ poster, title, description, rating } : 
    { poster: string, title: string, description: string, rating: number}) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 25,
            marginBottom: 10
        }}>
            <div>
                <div style={{
                    height: 330,
                    width: 220,
                    backgroundImage: `url(${poster})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}/>
            </div>

            <div>
                <h1 style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    color: colors.White, 
                    margin: 0, 
                    fontSize: 40
                    }}> 

                    {title} 
                    <Rating
                        sx={{ marginTop: 0.4, marginLeft: 2 }}
                        size="large"
                        value={rating} 
                        precision={0.5} 
                        readOnly
                        /> 
                    </h1>
                <p style={{ width: '90%', fontWeight: 'normal', color: colors.White, fontSize: 23, marginRight: 25, marginBottom: 0, marginTop: 10 }}> {description} </p>
            </div>
        </div>
    );
}

export default MovieInformations;