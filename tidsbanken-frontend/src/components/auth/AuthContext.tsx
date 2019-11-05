import React from 'react';

type auth = {
    token: string;
    authenticated: boolean;
}

const AuthContext = React.createContext<auth | null>(null);
AuthContext.displayName = "AuthContext";

export default AuthContext;