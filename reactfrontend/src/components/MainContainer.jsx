import styles from "../styles/main-container.module.css";
import darkModeContext from "../context/darkModeContext";
import { useContext } from "react";

const MainContainer = ({ children }) => {
    const {darkMode} = useContext(darkModeContext);
    
    return(
        <div className={`${styles.container} ${darkMode && styles.dark}`}>
            {children}
        </div>
    )
}

export default MainContainer;