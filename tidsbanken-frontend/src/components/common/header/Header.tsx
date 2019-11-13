import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../auth/AuthContext';
import styles from '../../../css/Header.module.css';
import commonStyles from '../../../css/Common.module.css';
import Dropdown from '../dropdown/Dropdown';
import Pusher from 'pusher-js';

const Header = (props: any) => {

    const auth = useContext(AuthContext);
    var [liArray, setLiArray] = useState<any[]>([]);    // Used for li html elemnts
    const [update, setUpdate] = useState<any>({});      // Used for li html elemnts

    // Setup push notification
    var pusher = new Pusher('4c6550e4e866a013a371', {
        cluster: 'eu',
        forceTLS: true
    });

    useEffect(() => {
        var channel = pusher.subscribe('notifications');

        channel.bind('user_update', function(data: any) {
            setUpdate(data);
        });

        channel.bind('pusher:subscription_succeeded', function(members) {
            console.log('successfully subscribed! - Pusher');
        });
    }, [])

    useEffect(() => {
        getNotification();
    },[update]);

    function getNotification(){
        // DONT FORGET TO UPDATE USERID CONTROLLEN !!!!!)!&)!(/%!!)
        // DONT FORGET TO UPDATE USERID CONTROLLEN !!!!!)!&)!(/%!!)
        // DONT FORGET TO UPDATE USERID CONTROLLEN !!!!!)!&)!(/%!!)
        // DONT FORGET TO UPDATE USERID CONTROLLEN !!!!!)!&)!(/%!!)
        if(update.userId){
            const liElement = <li className={update.status ? "good" : "bad"}> {update.userId}</li>
            setLiArray(liArray.concat(liElement));
        }  
    }

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

                <Dropdown title={'Notifications'}>
                    <ul>{liArray}</ul>
                </Dropdown>
            </header>
    )
}

export default Header;