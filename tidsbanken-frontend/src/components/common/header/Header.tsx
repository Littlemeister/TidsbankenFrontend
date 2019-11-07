import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../css/Header.module.css';
import commonStyles from '../../../css/Common.module.css';
import Dropdown from '../dropdown/Dropdown';

export default class Header extends React.Component {

    render() {
        return (
            <header className={styles.module}>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/2fa">2FA</Link>
                <Link to="/test">Test</Link>

                <Dropdown title="username">
                    <ul className={commonStyles.dropdown}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/2fa">2fa</Link></li>
                    </ul>
                </Dropdown>
            </header>
        );
    }

}