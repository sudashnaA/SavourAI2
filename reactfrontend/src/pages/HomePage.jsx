import MainContainer from "../components/MainContainer";
import { Link } from "react-router-dom";
import styles from "../styles/link.module.css";
import { useContext } from "react";
import darkModeContext from "../context/darkModeContext";

const HomePage = () => {
    const { darkMode } = useContext(darkModeContext);

    return(
    <MainContainer >
        <h1>Welcome to SavourAI</h1>
        <p>Get Started by: <Link className={`${ darkMode && styles.dark}`} to={"/generate"}>Generating Recipes</Link></p>
    </MainContainer>
    )
}

export default HomePage;