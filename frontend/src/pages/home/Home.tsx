import { HomeHeader } from "./HomeHeader"
import './Home.scss';
import { HomeSeperator } from "./HomeSeperator";
import { HomeExamples } from "./HomeExamples";

export const Home = () => {
    return(
        <div className="home">
            <HomeHeader />
            <HomeSeperator />
            <HomeExamples />
        </div>
    )
}