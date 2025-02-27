import { Navigate } from "react-router-dom"
import darkModeContext from "../context/darkModeContext";
import { useContext } from "react";

const Logout = () => {
    const {darkMode, setDarkMode} = useContext(darkModeContext);
    localStorage.setItem("jwt", null);
    setDarkMode(false);
    return (
        <Navigate to={"/"}/>
    )
}

export default Logout;