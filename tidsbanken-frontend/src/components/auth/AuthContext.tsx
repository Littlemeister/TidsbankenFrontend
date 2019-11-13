import React from 'react';

export type auth = {
        name: string,
        lastName: string,
        isAdmin: number,
        twoFacAut: number,
        setUser: any,
}

const AuthContext = React.createContext<Partial<auth>>({});
AuthContext.displayName = "AuthContext";

export default AuthContext;