import { Link } from "react-router-dom";
import { useContext } from "react";
import darkModeContext from "../context/darkModeContext";
import MainContainer from "../components/MainContainer";
import SideBar from "../components/SideBar";
import styles from "../styles/link.module.css";

const ErrorPage = () => {
  const LoggedIn = localStorage.getItem('jwt') !== 'null';
  const { darkMode } = useContext(darkModeContext);
  return (
    <>
    {LoggedIn && <SideBar />}
    <MainContainer>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link className={`${ darkMode && styles.dark}`} to={LoggedIn ? "/home" : "/"}>
        <p>Return</p>
      </Link>
    </MainContainer>
    </>
  );
};

export default ErrorPage;
