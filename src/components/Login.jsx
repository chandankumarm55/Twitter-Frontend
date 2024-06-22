import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import Logo from "../images/logo.jpg";
import { getUser } from '../redux/userSlice';
import { USER_API_END_POINT } from '../utils/constant';
import './Login.css';

const Login = () => {
    const [isLogin, setLogin] = useState(true);
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? "/login" : "/register";
            axios.defaults.withCredentials = true; // This line ensures cookies are sent with requests
            const payload = isLogin ? { email, password } : { name, username, email, password };
            const res = await axios.post(
                `${USER_API_END_POINT}${endpoint}`,
                payload,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true // Ensure that the request includes credentials (cookies)
                }
            );

            dispatch(getUser(res.data.user));
            toast.success(res.data.message);

            if (!isLogin) {
                setLogin(true);
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            console.error(error);
        }
    };

    const loginSignupHandler = () => {
        setLogin(!isLogin);
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className='image-container'>
                    <img src={ Logo } width="300px" height="300px" alt="Logo" />
                </div>
                <div>
                    <h2 style={ { fontSize: '50px' } }>Happening Now</h2>
                    <h1>Join today.</h1>
                    <h2>{ isLogin ? "Login" : "Signup" }</h2>
                    <form className="login-form" onSubmit={ submitHandler }>
                        { !isLogin && (
                            <>
                                <input
                                    type='text'
                                    value={ name }
                                    onChange={ (e) => setName(e.target.value) }
                                    placeholder='Name'
                                    className="input-field"
                                />
                                <input
                                    type='text'
                                    value={ username }
                                    onChange={ (e) => setUserName(e.target.value) }
                                    placeholder='Username'
                                    className="input-field"
                                />
                            </>
                        ) }
                        <input
                            type='email'
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) }
                            placeholder='Email'
                            className="input-field"
                        />
                        <input
                            type='password'
                            value={ password }
                            onChange={ (e) => setPassword(e.target.value) }
                            placeholder='Password'
                            className="input-field"
                        />
                        <button className="button">{ isLogin ? "Login" : "Create Account" }</button>
                        <div className="message">
                            { isLogin ? 'Do not have an account? ' : 'Already have an account? ' }
                            <span onClick={ loginSignupHandler }>
                                { isLogin ? 'Signup' : 'Login' }
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
