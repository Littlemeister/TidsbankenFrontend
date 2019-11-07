import React from 'react';
import styles from '../../css/Login.module.css';
import commonStyles from '../../css/Common.module.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Popover from '../common/popover/Popover';

type MyProps = {

}

type MyState = {
    email: string,
    password: string,
    error: boolean,
    message: string,
    success: boolean,
}

export default class LoginComponent extends React.Component<MyProps, MyState> {

    state: MyState = {
        email: "",
        password: "",
        error: false,
        message: "Error",
        success: false,

    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            let login = await this.login();
            if (login.status === 200) {
                this.setState({success: true});
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleClick = async (event: any) => {
        try {
            let user = await this.user();
            console.log(user);
        }
        catch(error) {
            console.log(error);
        }
    }

    handleChange = (event: any): void => {
        this.setState({
            [event.target.name]: event.target.value
        } as MyState);
    }

    user = async () => {
        return axios(`${process.env.REACT_APP_API_URL}/user`, {method: "GET", withCredentials: true});
    }

    login = async () => {
        const { email, password } = this.state;
        return axios(`${process.env.REACT_APP_API_URL}/login`, {method: "POST", withCredentials: true, data: { email, password }});
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

                        <button className={commonStyles.button} type="submit">Login</button>

                        <Popover 
                            trigger="Forgot password?"
                            triggerId={styles.forgot_password}
                            id={styles.popOver}
                        >
                            Please contact your administrator for a new password
                        </Popover>
                        <p onClick={this.handleClick}>User</p>

                    </form>
                </div>
            )
        }
    } // END render()

}