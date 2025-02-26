import styles from "../styles/button-container.module.css";
import darkModeContext from "../context/darkModeContext";
import { useContext } from "react";

const ButtonContainer = ({children}) => {
    const {darkMode} = useContext(darkModeContext);
    
    return(
        <div className={`${styles.buttoncontainer} ${darkMode && styles.dark}`}>
            {children}
        </div>
    )
}

export default ButtonContainer;