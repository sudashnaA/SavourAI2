import { Link } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import SideBar from "../components/SideBar";

const ErrorPage = () => {
  const LoggedIn = localStorage.getItem('jwt') !== 'null';
  return (
    <>
    {LoggedIn && <SideBar />}
    <MainContainer>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">
        <p>Return</p>
      </Link>
    </MainContainer>
    </>
  );
};

export default ErrorPage;
