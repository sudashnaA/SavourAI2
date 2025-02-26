import Switch from "../components/Switch";
import darkModeContext from "../context/darkModeContext";
import MainContainer from "../components/MainContainer";
import { useContext } from "react";

const SettingsPage = () => {
    const {darkMode, setDarkMode} = useContext(darkModeContext);
    
    const handleSwitch = () => {
        setDarkMode(!darkMode);
    }

    return(
        <MainContainer>
            <h1>Settings:</h1>
            <div>
                <label> Theme: <Switch on={Boolean(darkMode)} setOn={handleSwitch} /></label>
            </div>
        </MainContainer>
    )
}

export default SettingsPage;