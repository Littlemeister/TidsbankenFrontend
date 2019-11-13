import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../auth/AuthContext';
import styles from '../../../css/Header.module.css';
import commonStyles from '../../../css/Common.module.css';
import Dropdown from '../dropdown/Dropdown';

const Header = (props: any) => {

    const auth = useContext(AuthContext);

    return (
        <header className={styles.module}>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/2fa">2FA</Link>
                <Link to="/test">Test</Link>
                <Link to="/dashboard">Dashboard</Link>

                <Dropdown title={auth.name || "Menu"}>
                    <ul className={commonStyles.dropdown}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/2fa">2fa</Link></li>
                        <li><Link to="/logout">Log out</Link></li>
                    </ul>
                </Dropdown>
            </header>
    )
}

export default Header;