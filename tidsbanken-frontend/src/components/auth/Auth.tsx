import React, { useState, useEffect } from 'react';
import AuthContext, { userType } from './AuthContext';
import axios from 'axios';

const Auth = (props: any) => {

    const [user, setUser] = useState<userType>({} as userType);

    const authorize = () => axios(`${process.env.REACT_APP_API_URL}/authorize`, { method: "POST", withCredentials: true });

    const setUserInfo = (user: userType) => {
        setUser(user);
    }

    useEffect(() => {
        try {
            authorize()
                .then(res => {
                    if (res.status === 200) {
                        setUser(res.data as userType);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <>
            {<AuthContext.Provider value={{user, setUser: setUserInfo}}>
                {props.children}
            </AuthContext.Provider>}
        </>
    )
}

export default Auth;