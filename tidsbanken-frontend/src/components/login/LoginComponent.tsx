import React from 'react';
import styles from '../../css/Login.module.css';
import commonStyles from '../../css/Common.module.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Popover from '../common/popover/Popover';

type MyProps = { }

type MyState = {
    email: string,
    password: string,
    error: boolean,
    message: string,
    success: boolean,
    popOver: boolean, 

    ls_timeLeft: number,
    ls_timeTo: number,
    minutLeft: number,
    secondsLeft: number,
    btnNotDisabled: boolean
}

export default class LoginComponent extends React.Component<MyProps, MyState>{

    state: MyState = {
        email: "",
        password: "",

        // If login succeded or not
        success: false,

        // Forgot password
        popOver: false, 

        // Error handling
        error: false,
        message: "",

        // Time handling
        ls_timeLeft: 0,        // used for localstorage
        ls_timeTo: 0,          // used for localstorage
        minutLeft: 0,       // used for frontend
        secondsLeft: 0,      // used for frontend
        btnNotDisabled: true //Disable btn so user's cant send login requests
    }

    componentDidMount = () => {
        this.getTimeLeft(); // Check if a localstorage timeTo is set which indicates that a failed login attempt has been made. It also sets a state that has the amount of time left until a loginattempt can be made again.
    }

    checkCounter = () => {
        // Set counter to 5 minuts in localstorage and state "ls_timeLeft" if there is none or zero present
        if(localStorage.getItem("timeTo") === "" || localStorage.getItem("timeTo") === null || localStorage.getItem("timeTo") === undefined){
            this.setCounterInLocalStorage(); // Set counter in localStorage
            this.timer(); //Start timer for frontend
            this.setState({btnNotDisabled:false})
        } else { // If counter in localstorage already exsist and is not zero - update the counter
            this.getTimeLeft();
        }
    }

    // Sets localstorage AND state to a date that is 5 minuts from now
    setCounterInLocalStorage = () => {
        const timeNow = new Date().getTime();
        const timeTo = (new Date().getTime() + (5*60000));
        var distance = timeTo - timeNow;
        var minutes = this.getMinuts(distance);

        localStorage.setItem("timeTo", timeTo.toString());
    }

    getTimeLeft = () => {
        if(localStorage.getItem("timeTo")){
            const to = Number(localStorage.getItem("timeTo"));
            const now = (new Date().getTime());
            const timeDistance = to - now;
            console.log("this.state.secondsLeft: ");
            console.log(this.state.secondsLeft);
            

            if(timeDistance > 0){
                this.timer();
                this.setState({
                    ls_timeLeft: timeDistance,
                    btnNotDisabled:false,
                    error: true,
                });  
            } else { 
                this.setState({
                    ls_timeLeft: 0,
                    btnNotDisabled:true
                });
                localStorage.removeItem("timeTo");
                console.log("timeTo in Localstorage was removed");
            }   
        } else {
            console.log("No localstorage timeTo found");
        }
    }

    getMinuts(distance:any){
        return Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    }

    timer(){
        // Update the count down every 1 second
        var counter = setInterval(() => {
            var now = new Date().getTime();  // Get today's date and time
            var distance = Number(localStorage.getItem("timeTo")) - now; // Find the distance between now and the count down date
        
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            var secondsLeft = distance - (minutes * 60);
            console.log("minute " + minutes);
            console.log("secondsleft " + seconds);

            if (distance < 0) {
                clearInterval(counter);
            } else {
                this.setState({
                    minutLeft: minutes,       // used for frontend
                    secondsLeft: seconds,      // used for frontend
                    message: "You have made 5 attempts please try again in " + this.state.minutLeft + " minutes and " + this.state.secondsLeft + " seconds",
                })
                console.log(this.state.secondsLeft);
            }          

        }, 1000);
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log("Login: " + this.state.email + " " + this.state.password);
        try {
            let login = await this.login();
            console.log(login);
            if (login.status === 200) {
                this.setState({ success: true });
            }
        } catch (error) {
            this.setState({ error: true });
            console.log(error.response.data['numOfAttemptedLogins']);
            if(error.response.data.hasOwnProperty('timeOut') || error.response.data['numOfAttemptedLogins'] === 5){ 
                this.setState({ 
                    message: "You have made 5 attempts please try again in " + this.state.secondsLeft + " minutes" 
                });
                this.checkCounter(); // Set counter or update counter from localstorage
            } else {
                this.setState({ 
                    message: "You have " + (5 - error.response.data['numOfAttemptedLogins']) + " attempts left." 
                })
            }
            console.log(error.response.data);
        }
    }

    handleClick = async (event: any) => {
        try {
            let user = await this.user();
            console.log(user);
        }
        catch (error) {
            console.log(error);
        }
    }

    handleChange = (event: any): void => {
        this.setState({
            [event.target.name]: event.target.value
        } as MyState);
    }

    user = async () => {
        return axios(`${process.env.REACT_APP_API_URL}/user`, {
            method: "GET",
            withCredentials: true
        });
    }

    login = async () => {
        const { email, password } = this.state;
        return axios(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            withCredentials: true,
            data: { email, password }
        });
    }

    render() {

        if (this.state.success) {
            return <Redirect to='/2fa' />
        } else {
            return (
                <div id={styles.login_wrapper}>
                    <h1>LOGIN</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label className={commonStyles.label} htmlFor="email">Email</label>
                        <input
                            name="email"
                            className={commonStyles.input}
                            type="email"
                            placeholder="Enter your email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                        <label className={commonStyles.label} htmlFor="password">Password</label>
                        <input
                            name="password"
                            className={commonStyles.input}
                            type="password"
                            placeholder="Enter your password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                        <p id={styles.errorMessage}>{this.state.error && this.state.message}</p>

                        <button className={commonStyles.button + " " + styles.submit_login} type="submit" disabled={!this.state.btnNotDisabled}>Login</button>

                        <button id={styles.forgot_password} type="button" onClick={() => this.setState({ popOver: !this.state.popOver })}>Forgot password?</button>
                        <Popover popoverDislay={this.state.popOver} id={styles.popOver}>Please contact your administrator for a new password</Popover>
                        <p onClick={this.handleClick}>User</p>

                    </form>
                </div>
            )
        }
    } // END render()

}