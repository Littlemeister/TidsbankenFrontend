import React, { useState, useEffect } from 'react';
import AuthContext, { auth } from './AuthContext';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const AuthRoute = (props: any) => {

    const [user, setUser] = useState({} as auth);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const authorize = () => axios(`${process.env.REACT_APP_API_URL}/authorize`, { method: "POST", withCredentials: true });

    useEffect(() => {
        try {
            authorize()
                .then(res => {
                    if (res.status === 200) {
                        setSuccess(true);
                        setUser(res.data as auth)
                    }
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        setSuccess(false);
                        setError(true);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }, []);

    const { component: Component } = props;

    return (
        <>
            {success && <AuthContext.Provider value={user}>
                <Component {...props} />
            </AuthContext.Provider>}
            {error && !success && <Redirect to="/login" />}
        </>
    )

}

export default AuthRoute;