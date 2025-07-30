import React, { useState, createContext } from 'react'

export const AuthStore = createContext();

export const AuthStoreProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [sessionValidity, setSessionValidity] = useState(null);


    return (
        <AuthStore.Provider value={{ user, setUser,accessToken, setAccessToken,sessionValidity, setSessionValidity }}>
            {children}
        </AuthStore.Provider>
    )
}
