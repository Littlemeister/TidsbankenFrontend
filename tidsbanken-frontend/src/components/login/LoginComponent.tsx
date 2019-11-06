import React from 'react';
import styles from '../../css/login.module.css';
import axios from 'axios';
import { Http2ServerRequest } from 'http2';
import { Redirect } from 'react-router-dom';

type MyProps = {

}

type MyState = {
    email: string,
    password: string,
    error: boolean,
    message: string,
    loggin: boolean
}

export default class LoginComponent extends React.Component<MyProps, MyState>{

    state: MyState = {
        email: "",
        password: "",
        error: false,
        message: "Error",
        loggin: false
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
        // axios.get(`https://localhost/data`)
        // .then(res => {
        //      this.setState({
        //             loggin:true
        //         });
        // })
        this.setState({
            loggin:true
        });
    }

    render(){
        if(this.state.loggin){
            return <Redirect to='/2fa' /> 
        } else {
            return(
                <div id={styles.login_wrapper}>
                    <h1>LOGIN</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label> <p>Email</p> <input name="email" type="email" placeholder="Enter your email" onChange={this.handleChange} value={this.state.email}/> </label>
                        <label> <p>Password</p> <input name="password" type="password" placeholder="Enter your password" onChange={this.handleChange} value={this.state.password} /> </label>
                        <p id={styles.errorMessage}>{this.state.error && this.state.message}</p>
                        <label><button id={styles.submit_login} type="submit">Submit</button> </label>
                        <button id={styles.forgot_password} type="button">forgot password</button>
                    </form>
                </div>
            )
        }
    } // END render()

}