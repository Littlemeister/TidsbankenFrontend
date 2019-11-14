import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../api/API';

const Logout = (props: any) => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        API.logout()
            .then(res => {
                if (res.status === 200) {
                    setSuccess(true);
                } else {
                    setError(true);
                }
            })
    }, []);

    return (
        <>
            {success && <Redirect to="/login" />}
            {error && <p>Something went wrong with the logout, please try again</p>}
        </>
    )
}

export default Logout;