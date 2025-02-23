import { Navigate } from "react-router-dom"

const Logout = () => {
    localStorage.setItem("jwt", null);
    return (
        <Navigate to={"/"}/>
    )
}

export default Logout;