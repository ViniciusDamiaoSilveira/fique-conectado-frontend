import colors from "../../utils/colors";
import './sliderItem.css'

function SliderItem({imgUrl, text, width} : {imgUrl: string | null, text: string, width: string | number}) {
    return (
        <div 
        className="slider-item"
        style={{
            height: 180,
            width: width,
            display: 'flex',
            alignItems: 'center',
            transition: '0.5s',
            borderRadius: 30,
            position: "relative"
        }}>
            <div
                className="img-item"
                style={{
                    backgroundImage: imgUrl ? `url(${imgUrl})` : 'url()',
                    backgroundColor: !imgUrl ? colors.Black : '',
                    backgroundPositionX: 'center',
                    backgroundPositionY: 'center',
                    opacity: '50%',
                    height: 180,
                    width: '100%',
                    borderRadius: 5

                }}/>
            <p style={{ position: 'absolute', color: colors.White, fontWeight: "bold", fontSize: '21px', marginLeft: 20}}> {text.toUpperCase()} </p>
        </div>
    );
}

export default SliderItem;
