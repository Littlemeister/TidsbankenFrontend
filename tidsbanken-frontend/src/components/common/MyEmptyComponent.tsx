import React, { useContext } from 'react';
import AuthContext from '../auth/AuthContext';

const MyEmptyComponent = (props: any) => {
    const auth = useContext(AuthContext);
    return <p>{auth && auth.token}</p>
}

export default MyEmptyComponent;