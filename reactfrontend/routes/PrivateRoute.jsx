import { Navigate } from "react-router-dom";
import axios from "axios";
import useGetData from "../src/util/useGetData";


const PrivateRoute = ({ children }) => {
    const { errors, loading } = useGetData("account/validate/");
    return(
        <>
            {(!loading) && ((errors) ? <Navigate to="/" /> : <>{ children }</>)}
        </>
    );
}

export default PrivateRoute;