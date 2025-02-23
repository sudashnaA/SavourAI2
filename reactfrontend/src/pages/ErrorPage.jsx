import { Link } from "react-router-dom";
import styles from "../styles/main.module.css"
import SideBar from "../components/SideBar";

const ErrorPage = () => {
  const LoggedIn = localStorage.getItem('jwt') !== 'null';
  return (
    <>
    {LoggedIn && <SideBar />}
    <div className={styles.container}>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">
        <p>Return</p>
      </Link>
    </div>
    </>
  );
};

export default ErrorPage;
