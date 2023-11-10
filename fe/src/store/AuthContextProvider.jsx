import { createContext, useState } from "react";

export const AuthContext = createContext({
    token:'',
    userInfo: {
        nickname: '',
        image:null,
    },
    loggedIn: false,
});

const AuthContextProvider = ({ children }) => {

    const initialState = {
        token: '',
        userInfo: {
            nickname: '',
            image: null,
        },
        loggedIn: false,
    }

    const setToken = (newToken) => {
        setUser(prevState => ({
            ...prevState, 
            token: newToken
        }))
    }
    
    const setLoggedIn = () => {
        setUser(prevState => ({
            ...prevState, 
            loggedIn: !prevState.loggedIn
        }))
    }

    const setUserInfo = (nickname, image) => {
        setUser(prevState => ({
            ...prevState,
            userInfo: {
                nickname,
                image,
            },
        }))
    }

    const [user, setUser] = useState(initialState);

    return (
        <AuthContext.Provider value={{user, setToken, setLoggedIn, setUserInfo}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;