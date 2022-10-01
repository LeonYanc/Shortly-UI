import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Keycloak from "keycloak-js";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

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
  const handleLogIn = () => {
    const keycloak = new Keycloak("/keycloak.json");
    keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        redirectUri: "http://localhost:3000/",
      })
      .then((authenticated) => {
        if (authenticated) {
          console.log(keycloak.token);
          authCtx.logIn(keycloak.token);
        } else {
          authCtx.logIn(keycloak.token);
          keycloak.login();
          console.log(keycloak.token);
        }
      })
      .catch(function () {
        alert("failed to initialize");
      });
  };
  const handleLogOut = () => {
    const keycloak = new Keycloak("/keycloak.json");
    console.log("what happende??");
    keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",

        redirectUri: "http://localhost:3000/",
      })
      .then((authenticated) => {
        if (authenticated) {
          keycloak.logout();
          authCtx.logOut();
        }
      })
      .catch(function () {
        alert("failed to initialize");
      });
  };

  const handleRegister = () => {
    const keycloak = new Keycloak("/keycloak.json");
    keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",

        redirectUri: "http://localhost:3000/",
      })
      .then((authenticated) => {
        if (!authenticated) {
          keycloak.register();
        }
      })
      .catch(function () {
        alert("failed to initialize");
      });
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Shortly</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <button onClick={handleLogIn}>Login</button>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <button onClick={handleRegister}>Signup</button>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
