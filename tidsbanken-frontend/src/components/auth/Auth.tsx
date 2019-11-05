import React from 'react';
import AuthContext from './AuthContext';

type MyProps = {
    children: any;
}

type MyState = {
    token: string;
    authenticated: boolean;
}

export default class Auth extends React.Component<MyProps, MyState> {

    // This state must match the type defined in AuthContext
    state: MyState = {
        token: "",
        authenticated: false,
    }

    componentDidMount() {
        // This is where we do the check to check if the user is authenticated or not
        // If they are, we set their info in the state (which gets provided to any subcomponent)
        // If they are not authenticated we redirect them to /login.
        this.setState({token: "hello", authenticated: true});
    }

    render() {

        const { children } = this.props;

        return (
            <AuthContext.Provider value={this.state}>
                {children}
            </AuthContext.Provider>
        );
    }

}