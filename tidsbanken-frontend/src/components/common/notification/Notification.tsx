import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

const Notification = (props: any) => {

    var [liArray, setLiArray] = useState<any[]>([]);
    const [update, setUpdate] = useState<any>({});

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
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
        console.log("iashd");
        
        // DONT FORGET TO UPDATE USERID CONTROLLEN !!!!!)!&)!(/%!!)
        if(update.userId){
            const test = <li className={update.status ? "good" : "bad"}> {update.userId}</li>
            var a = liArray.concat(test);
            setLiArray(a);
        }  
    }

    return(
        <ul>
            {liArray}
        </ul>
    )

}

export default Notification;