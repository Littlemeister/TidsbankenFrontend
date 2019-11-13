import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import { Redirect } from 'react-router-dom';

const AuthRoute = (props: any) => {

    const auth = useContext(AuthContext);
    const { component: Component } = props;

    console.log(auth);

    return (
        <>
            {auth.name ? <Component  {...props} /> : <Redirect to="/login" />}
        </>
    )
}

export default AuthRoute;