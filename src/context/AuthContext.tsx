import React, { createContext, useState, useContext } from 'react';
import { UsuarioAuth } from '../services/authService';

interface AuthContextProps {
    user: UsuarioAuth  | null;
    setUser: (user: UsuarioAuth | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UsuarioAuth | null>(null);

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);