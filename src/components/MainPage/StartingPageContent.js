import React, { useState, useContext, Fragment } from "react";
import classes from "./StartingPageContent.module.css";
import AddUrl from "../Urls/AddUrl";
import UrlLists from "../Urls/UrlLists";
import AuthContext from "../../store/auth-context";
const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [urlLists, setUrlLists] = useState([]);

  const shortenUrlHandler = (url) => {
    setUrlLists((prevUrlList) => {
      const { longUrl, shortUrl } = url;
      return [
        ...prevUrlList,
        {
          longUrl: longUrl,
          shortUrl: shortUrl,
        },
      ];
    });
  };
  return (
    <section className={classes.starting}>
      {isLoggedIn && (
        <Fragment>
          {" "}
          <AddUrl onShortenUrl={shortenUrlHandler}></AddUrl>
          <UrlLists urls={urlLists}></UrlLists>
        </Fragment>
      )}
      {!isLoggedIn && "please log in to shorten Url"}
    </section>
  );
};

export default StartingPageContent;
