import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  userId: 0,
  userInfo: {
    nickname: '',
    image: null,
  },
  loggedIn: false,
});

const AuthContextProvider = ({ children }) => {
  const initialState = {
    token: '',
    userId: 0,
    userInfo: {
      nickname: '',
      image: null,
    },
    loggedIn: false,
  };
  const [user, setUser] = useState(initialState);

  const login = ({ token, userId }) => {
    fetch(`/users/profile/${userId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ nickname, image }) => {
        setUser({ token, userId, userInfo: { nickname, image }, loggedIn: true });
      });
  };

  const logout = () => {
    setUser(initialState);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
