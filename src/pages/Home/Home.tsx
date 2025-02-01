import Header from "../../components/header/header";
import Navigator from "../../components/navigator/navigator";
import Showcase from "../../components/showcase/showcase";

import './Home.css'

export default function Home() {
    return (
        <div>
            <Header />
            <div className="first-row-home">
                <div className="navigator-home">
                    <Navigator />
                    <Showcase />
                </div>

                <div className="feed-home">
                    aaa
                </div>
            </div>
        </div>
    ) 
}