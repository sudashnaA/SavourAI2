import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const notLoggedIn = localStorage.getItem('jwt') === 'null';
    return(
        (notLoggedIn) ? <Navigate to="/" />
        :  <>{ children }</>
    );
}

export default PrivateRoute;