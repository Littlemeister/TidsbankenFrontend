import React from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import { auth } from './AuthContext';

type MyProps = {
    children: any;
}

type MyState = {
    success: boolean,
    error: boolean,
    user: auth | null,
}

export default class Auth extends React.Component<MyProps, MyState> {

    // This state must match the type defined in AuthContext
    state: MyState = {
        success: false,
        error: false,
        user: null,
    }

    authorize() {
        return axios(`${process.env.REACT_APP_API_URL}/authorize`, { method: "POST", withCredentials: true });
    }

    async componentDidMount() {
        // This is where we do the check to check if the user is authenticated or not
        // If they are, we set their info in the state (which gets provided to any subcomponent)
        // If they are not authenticated we redirect them to /login.

        try {
            let auth = await this.authorize();
            if (auth.status === 200) {
                this.setState({ user: JSON.parse(localStorage.getItem("user") || "") });
                this.setState({ success: true });
            }
        } catch (error) {
            if (error.response.status === 401) {
                this.setState({ success: false, error: true})
            }
        }
    }

    render() {

        const { children } = this.props;

        return (
            <AuthContext.Provider value={this.state.user}>
                {children}
            </AuthContext.Provider>
        );
    }

}