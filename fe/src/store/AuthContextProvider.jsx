import { createContext, useState } from "react";

const AuthContext = createContext({
    token:'',
    user: {
        nickname: '',
        image:null,
    },
    loggedIn: false,
    setToken: () => {},
    setLoggedIn: () => {},
    setUser: () => {},
});

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
    const setToken = (newToken) => {
        setState(prevState => ({
            ...prevState, 
            token: newToken
        }))
    }
    
    const setLoggedIn = () => {
        setState(prevState => ({
            ...prevState, 
            loggedIn: !prevState.loggedIn
        }))
    }

    const setUser = (nickname, image) => {
        setState(prevState => ({
            ...prevState,
            user: {
                nickname,
                image,
            },
        }))
    }

    const initialState = {
        token: '',
        user: {
            nickname: '',
            image: null,
        },
        loggedIn: false,
        setToken,
        setLoggedIn,
        setUser,
    }

    const [state, setState] = useState(initialState);

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    );
};
