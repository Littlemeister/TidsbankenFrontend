import React, { useState, useContext, useRef, useEffect } from 'react';
import styles from '../../css/TwoFactorAuth.module.css';
import commonStyles from '../../css/Common.module.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

const TwoFactorAuthComponent = (props: any) => {
    const auth = useContext(AuthContext);
    let inputRef = useRef<HTMLInputElement>(null);

    const [token, setToken] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        (inputRef.current as any).focus();
    }, [])

    const login2fa = () => {
        return axios(`${process.env.REACT_APP_API_URL}/login2fa`, {
            method: "POST",
            withCredentials: true,
            data: { "password2fa": token }
        });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            let login = await login2fa();
            if (login.status === 200) {
                auth.setUser(login.data);
                console.log(auth);
                setSuccess(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError(true);
            }
        }
    }

    const handleChange = (event: any) => {
        setToken(event.target.value);
        if(event.target.value.length >= 5) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    return (
        <>
            {success ? <Redirect to="/dashboard" /> : ""}
            <div className={styles.module}>
                <h1>TWO FACTOR AUTHENTICATION</h1>
                <form onSubmit={handleSubmit}>
                    <label className={commonStyles.label} htmlFor="token">Token</label>
                    <input
                        name="token"
                        className={commonStyles.input}
                        type="text"
                        placeholder="Token"
                        onChange={handleChange}
                        value={token}
                        minLength={5}
                        maxLength={6}
                        ref={inputRef}
                    />
                    <p id={styles.errorMessage}>{error && message}</p>
                    <button className={commonStyles.button} type="submit" disabled={disabled}>Authenticate</button>
                </form>
            </div>
        </>
    )
}

export default TwoFactorAuthComponent;