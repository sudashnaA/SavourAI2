import darkModeContext from "./darkModeContext";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

const Theme = ({children}) => {
    const [darkMode, setDarkMode] = useLocalStorage('darkmode', false);

    return (
        <darkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </darkModeContext.Provider>
    )
}

export default Theme;