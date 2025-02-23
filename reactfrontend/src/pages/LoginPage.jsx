import mainstyle from "../styles/main.module.css";
import style from "../styles/login-register.module.css";

import Form from "../components/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import FormErrors from "../components/FormErrors";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState(null);
    const [formErrors, setFormErrors] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setErrors(null);
        setFormErrors(null);
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + 'account/login', {
                username,
                password
            })
            localStorage.setItem('jwt', response.data.token);
            navigate("/home");
        } catch (error) {
            if (error.hasOwnProperty("response")){
                setFormErrors(error.response.data.errors);
            } else {
                setErrors(error);
            }
        }
    }

    return (
        <div className={mainstyle.container}>
            <h1>Login</h1>
            {formErrors && <FormErrors errors={formErrors} />}
            <Form handleSubmit={handleSubmit}>
                <label>
                Username: 
                <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
                </label>
                <label>
                Password: 
                <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <input type="submit"></input>
            </Form>
            {errors && <p>A network error was encountered</p>}
            <Link className={style.link} to="/register">Dont have an account?</Link>
        </div>
    )
}

export default LoginPage;