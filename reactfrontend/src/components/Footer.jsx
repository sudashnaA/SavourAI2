import styles from "../styles/footer.module.css"
import darkModeContext from "../context/darkModeContext";
import { useContext } from "react";

const Footer = () => {
    const {darkMode} = useContext(darkModeContext);

    return(
        <div className={`${styles.footer} ${darkMode && styles.dark}`}>
            <p>2024</p>
        </div>
    )
}

export default Footer;