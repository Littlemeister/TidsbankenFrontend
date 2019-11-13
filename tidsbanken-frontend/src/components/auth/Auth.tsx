import React, { useState, useEffect } from 'react';
import AuthContext, { auth } from './AuthContext';
import axios from 'axios';

const Auth = (props: any) => {

    const [user, setUser] = useState({});

    const authorize = () => axios(`${process.env.REACT_APP_API_URL}/authorize`, { method: "POST", withCredentials: true });

    const setUserInfo = (user: any) => {
        let newUser = {...user, setUser: setUserInfo}
        console.log("setting user", newUser);
        setUser(newUser);
    }

    useEffect(() => {
        try {
            authorize()
                .then(res => {
                    if (res.status === 200) {
                        const user = {...res.data, setUser: setUserInfo};
                        setUser(user);
                    }
                })
        } catch (error) {
            setUser({...user, setUser: setUserInfo})
            console.log(error);
        }
    }, []);


    return (
        <>
            {<AuthContext.Provider value={user}>
                {props.children}
            </AuthContext.Provider>}
        </>
    )
}

export default Auth;