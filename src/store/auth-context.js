import React, { useState, useEffect, useCallback } from "react";
import Keycloak from "keycloak-js";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  keycloak: null,
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");

  return storedToken;
};

export const AuthContextProvider = (props) => {
  const storedToken = retrieveStoredToken();

  // const [keycloak, setKeycloak] = useState(null);

  // useEffect(() => {
  //   const keycloak = new Keycloak("/keycloak.json");
  //   keycloak
  //     .init({
  //       onLoad: "check-sso",
  //       pkceMethod: "S256",
  //       //redirectUri: "http://localhost:3000/",
  //     })
  //     .then((authenticated) => {
  //       setKeycloak(keycloak);
  //     });
  // }, []);

  let initialToken;
  if (storedToken) {
    console.log(storedToken);
    initialToken = storedToken;
  }
  if (initialToken === "undefined") initialToken = undefined;
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;
  console.log(userIsLoggedIn, token);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  //   useEffect(() => {
  //     if (tokenData) {
  //       console.log(tokenData.duration);
  //       logoutTimer = setTimeout(logoutHandler, tokenData.duration);
  //     }
  //   }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    logIn: loginHandler,
    logOut: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
