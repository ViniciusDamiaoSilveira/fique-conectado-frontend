import Header from "../../components/Header/header";
import Navigator from "../../components/Navigator/navigator";
import Showcase from "../../components/Showcase/showcase";
import Slider from "../../components/SliderMoviesCategory/sliderMovies";

function Home() {
    return (
        <div>
            <Header />
            <div style={{ display: 'flex', gap: 40}}>
                <Navigator />
                <Slider />
            </div>
            <div>
                <Showcase />
            </div>
        </div>
    );
}

export default Home;