import React from 'react';
import styles from '../../css/TwoFactorAuth.module.css';
import commonStyles from '../../css/Common.module.css';
// import axios from 'axios';
import { Redirect } from 'react-router-dom';

type MyProps = {

}

type MyState = {
    token: string,
    success: boolean,
    error: boolean,
    message: string,
}

export default class TwoFactorAuthComponent extends React.Component<MyProps, MyState>{

    state: MyState = {
        token: "",
        success: false,
        error: false,
        message: "",
    }

    handleSubmit = (event:any) => {       
        event.preventDefault();
        this.serverRequest();
    }

    handleChange = (event:any): void => {
        this.setState({
            [event.target.name]: event.target.value
        } as MyState);
    }

    serverRequest = () =>{
        this.setState({
            success: true
        });
    }

    render(){
        if(this.state.success){
            return <Redirect to='/2fa' /> 
        } else {
            return(
                <div className={styles.module}>
                    <h1>TWO FACTOR AUTHENTICATION</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label className={commonStyles.label} htmlFor="token">Token</label>
                        <input 
                            name="token" 
                            className={commonStyles.input} 
                            type="text" 
                            placeholder="Token" 
                            onChange={this.handleChange} 
                            value={this.state.token}
                        />
                        <p id={styles.errorMessage}>{this.state.error && this.state.message}</p>
                        <button className={commonStyles.button} type="submit">Authenticate</button>
                    </form>
                </div>
            )
        }
    }

}