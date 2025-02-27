import Switch from "../components/Switch";
import SettingsItem from "../components/SettingsItem";
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
            <SettingsItem>
                <label>Dark Mode:</label><Switch on={Boolean(darkMode)} setOn={handleSwitch} />
            </SettingsItem>
        </MainContainer>
    )
}

export default SettingsPage;