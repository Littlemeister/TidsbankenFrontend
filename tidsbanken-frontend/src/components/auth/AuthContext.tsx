import React from 'react';

export type auth = {
        name: string,
        lastName: string,
        email: string,
        profilePic: string,
        salt: string,
        hash: string,
        isAdmin: number,
        twoFacAut: number,
        createdAt: string,
        updatedAt: string,
        userId: number,
}

const AuthContext = React.createContext<Partial<auth>>({});
AuthContext.displayName = "AuthContext";

export default AuthContext;