import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component{
    render(){
        return(
            <>
                <header>Header</header>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/2fa">2FA</Link>
                <Link to="/test">Test</Link>
            </>
        );
    }

}