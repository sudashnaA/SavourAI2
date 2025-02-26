import MainContainer from "../components/MainContainer";
import style from "../styles/login-register.module.css";
import Form from "../components/Form";
import FormErrors from "../components/FormErrors";
import { Link } from "react-router-dom";
import { useState } from "react";

import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState(null);
    const [formErrors, setFormErrors] = useState(null);

    const [registered, setRegistered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setErrors(null);
        setFormErrors(null);
        try {
            await axios.post(import.meta.env.VITE_API_URL + 'account/register', {
                username,
                password,
                confirmpassword,
            })
            setRegistered(true);
        } catch (error) {
            if (error.hasOwnProperty("response")){
                setFormErrors(error.response.data.errors);
            } else {
                setErrors(error);
            }
        }
    }

    return (
        <MainContainer>
            <h1>Register</h1>
            {formErrors && <FormErrors errors={formErrors} />}
            {(registered && !errors) && <ul><li className={style.success}>Successfully Registered</li></ul>}
            <Form handleSubmit={handleSubmit}>
                <label>
                Username: 
                <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
                </label>
                <label>
                Password: 
                <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <label>
                Confirm:&nbsp; 
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </label>
                <input type="submit"></input>
            </Form>
            {errors && <p>A network error was encountered</p>}
            <Link className={style.link} to="/login">Already have an account?</Link>
        </MainContainer>
    )
}

export default RegisterPage;