import mainstyle from "../styles/main.module.css";
import indexstyle from '../styles/index.module.css';
import { Link } from "react-router-dom";

const IndexPage = () => {
    return (
        <div className={mainstyle.container}>
            <div className={indexstyle.infocontainer}>
                <h1>Welcome to SavourAI</h1>
                <p>
                    Discover a world of culinary creativity with SavourAI, the ultimate recipe app designed to inspire and simplify
                    your cooking journey. Whether you're a seasoned chef or a beginner in the kitchen, Savourai makes it easy to explore,
                    create, and share your favorite recipes.
                </p>
            </div>
            <h2>Get Started:</h2>
            <div className={indexstyle.linkcontainer}>
                    <p><Link to="/login">Login</Link></p>
                    <p> <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default IndexPage;