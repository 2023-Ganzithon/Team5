import { createContext, useState } from "react";

export const AuthContext = createContext({
    token:'',
    userId:0,
    userInfo: {
        nickname: '',
        image:null,
    },
    loggedIn: false,
});

const AuthContextProvider = ({ children }) => {

    const initialState = {
        token: '',
        userId:0,
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
    const setUserId = (newUserId) => {
        setUser(prevState => ({
            ...prevState, 
            userId: newUserId
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
        <AuthContext.Provider value={{user, setToken, setUserId, setLoggedIn, setUserInfo}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;