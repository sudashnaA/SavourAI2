import { createContext } from "react";

const darkModeContext = createContext(
    {
        darkMode: false,
        setDarkMode: null
    }
);

export default darkModeContext;