import React from 'react';
import styles from '../../css/login.module.css';
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
    popOver: boolean
}

export default class LoginComponent extends React.Component<MyProps, MyState>{

    state: MyState = {
        email: "",
        password: "",
        error: false,
        message: "Error",
        success: false,
        popOver: false

    }

    handleSubmit = (event:any) => {       
        event.preventDefault();
        console.log("something was submittet: " + this.state.email + this.state.password);
        this.serverRequest();
    }

    handleChange = (event:any): void => {
        console.log("password");

        this.setState({
            [event.target.name]: event.target.value
        } as MyState);
    }

    serverRequest = () =>{
        axios.post(`${process.env.REACT_APP_API_URL}`+"/login", 
            {
                email: this.state.email, 
                password: this.state.password
            }
        )
            .then((res: any) => {
                console.log(res);
                this.setState({
                    success: true
                })
            })
    }

    render(){

        if(this.state.success){
            return <Redirect to='/2fa' /> 
        } else {
            return(
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
                        
                        <button id={styles.forgot_password} type="button" onClick={() => this.setState({popOver:!this.state.popOver})}>Forgot password?</button>
                        <Popover popoverDislay={this.state.popOver} id={styles.popOver}>Please contact your administrator for a new password</Popover>

                    </form>
                </div>
            )
        }
    } // END render()

}