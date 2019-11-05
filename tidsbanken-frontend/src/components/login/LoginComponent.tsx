import React from 'react';
import styles from '../../css/login.module.css';

type MyProps = {

}

type MyState = {
    email: any,
    password: any
}

export default class LoginComponent extends React.Component<MyProps, MyState>{

    state: MyState = {
        email: "",
        password: ""
    }

    handleSubmit = (event:any) => {
        //console.log("something was submittet: " + this.state.value);
        event.preventDefault();
    }

    handleChange = (event:any): void => {
        console.log("password");

        this.setState({
            [event.target.name]: event.target.value
        } as MyState);
        
    }

    render(){
        return(
            <div id={styles.login_wrapper}>
                <h1>LOGIN</h1>
                <form onSubmit={this.handleSubmit}>
                    <label> <p>Email</p> <input name="email" type="email" placeholder="Enter your email" onChange={this.handleChange} value={this.state.email}/> </label>
                    <label> <p>Password</p> <input name="password" type="password" placeholder="Enter your password" onChange={this.handleChange} value={this.state.password} /> </label>
                    <label><button id={styles.submit_login} type="submit">Submit</button> </label>
                    <button id={styles.forgot_password}>forgot password</button>
                </form>
            </div>
        )
    } // END render()

}