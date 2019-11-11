import React, {useState, useEffect} from 'react';
import AuthContext, {auth} from './AuthContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Auth = (props: any) => {

    const [user, setUser] = useState({});
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
        } catch (error) {
            if (error.response.status === 401) {
                setSuccess(false);
                setError(true);
            }
        }
    }, []);


    return (
        <>
        {success && <AuthContext.Consumer>
            {props.children}
        </AuthContext.Consumer>}
        {error && !success && <Redirect to="/login" />}
    </>
    )
}

export default Auth;