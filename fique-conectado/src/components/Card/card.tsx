import { Rating } from "@mui/material";
import colors from "../../utils/colors";

function Card({title, poster, release, vote} : {title: string, poster: string, release: string, vote: number}) {
    return (
        <div style={{ width: 240, color: colors.White }}>
            <img 
                style={{ 
                    width: 240
                }}
                src={poster} 
                alt="poster" />
            
            <p style={{ color: colors.White, fontWeight: "bold", fontSize: 22 }}> {title} </p>
            <div 
                style={{
                    display: 'flex',
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <p> {release} </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: 5}}> 
                    {vote.toPrecision(2)}
                    <Rating size="medium" style={{ display: 'flex', height: 20, alignItems: 'end' }} defaultValue={1} precision={0.5} readOnly emptyIcon={<label> </label>} /> 
                </p>
            </div>
        </div>
    );
}

export default Card;