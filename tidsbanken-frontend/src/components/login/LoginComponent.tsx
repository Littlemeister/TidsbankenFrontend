import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from '../../css/Login.module.css';
import commonStyles from '../../css/Common.module.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Popover from '../common/popover/Popover';
import AuthContext from '../auth/AuthContext';

const LoginComponent = (props: any) => {
    const auth = useContext(AuthContext);
    let inputRef = useRef<HTMLInputElement>(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [ls, setLs] = useState({
        minutesLeft: 0,
        secondsLeft: 0,
    });

    useEffect(() => {
        getTimeLeft();
        (inputRef.current as any).focus(); 
    }, []);

    useEffect(() => {
        console.log(auth);
    }, [auth])

    useEffect(() => {
        setMessage(`You have made 5 attempts please try again in ${ls.minutesLeft} minutes and ${ls.secondsLeft} seconds`);
    }, [ls])

    const timeLeft = (): number => {
        return Number(localStorage.getItem("timeTo")) - Date.now();
    }

    const timer = () => {
        let timer: number = window.setInterval(() => {
            let timeDelta: number = timeLeft();
            if (timeDelta < 0) {
                window.clearInterval(timer);
                setError(false);
                setMessage("");
                localStorage.removeItem("timeTo");
                setBtnDisabled(false);
            } else {
                let minutes = Math.floor((timeDelta % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((timeDelta % (1000 * 60)) / 1000);
                setLs({
                    ...ls,
                    minutesLeft: minutes,
                    secondsLeft: seconds,
                });
                setMessage(`You have made 5 attempts please try again in ${ls.minutesLeft} minutes and ${ls.secondsLeft} seconds`);
            }
        }, 1000);
    }

    const getTimeLeft = () => {
        if (localStorage.getItem("timeTo")) {
            if (timeLeft() > 0) {
                timer();
                setBtnDisabled(true);
                setError(true);
            } else {
                setBtnDisabled(false);
                localStorage.removeItem("timeTo");
            }
        }
    }

    const setCounterInLocalStorage = () => {
        const timeTo = new Date().getTime() + (5 * 60000);
        localStorage.setItem("timeTo", timeTo.toString());

    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            let response = await login();
            if (response.status === 200) {
                auth.setUser(response.data);
                setSuccess(true);
            }
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 504) {
                setError(true);
                let errorData = error.response.data;
                if (errorData.hasOwnProperty("timeOut") || errorData['numOfAttemptedLogins'] === 5) {
                    setMessage(`You have made 5 attempts, please try again in ${ls.minutesLeft} minutes`)
                    setCounterInLocalStorage();
                    timer();
                    setBtnDisabled(true);
                } else {
                    setMessage(`You have ${(5 - errorData['numOfAttemptedLogins'])} attempts left`);
                }
            }
            // If TwoFactorAuthentication
            if (error.response.status === 418) {
                setSuccess(true);
            }
        }
    }

    const handleChange = (event: any) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }

    const login = () => {
        const { email, password } = input;
        return axios(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            withCredentials: true,
            data: { email, password }
        });
    }

    return (
        <>
            {success ? <Redirect to="/2fa" /> :
                <div id={styles.login_wrapper}>
                    <h1>LOGIN</h1>
                    <form onSubmit={handleSubmit}>
                        <label className={commonStyles.label} htmlFor="email">Email</label>
                        <input
                            name="email"
                            className={commonStyles.input}
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={input.email}
                            ref={inputRef}
                        />
                        <label className={commonStyles.label} htmlFor="password">Password</label>
                        <input
                            name="password"
                            className={commonStyles.input}
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            value={input.password}
                        />
                        <p id={styles.errorMessage}>{error && message}</p>

                        <button className={commonStyles.button + " " + styles.submit_login} type="submit" disabled={btnDisabled}>Login</button>

                        <Popover
                            trigger="Forgot password?"
                            triggerId={styles.forgot_password}
                            id={styles.popOver}
                        >
                            Please contact your administrator for a new password
                        </Popover>
                    </form>
                </div>
            }
        </>
    )
}

export default LoginComponent;