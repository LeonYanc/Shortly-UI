import React from "react";

import Button from "../UI/Button";
import classes from "./UrlLink.module.css";
const UrlLink = (props) => {
  const { longUrl, shortUrl } = props.url;
  const copyHandler = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <li className={classes.url}>
      <span className={classes.longUrl}>{longUrl}</span>
      <span className={classes.rightDiv}>
        <span className={classes.shortUrl}>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </span>
        <Button onClick={copyHandler}>copy</Button>
      </span>
    </li>
  );
};

export default UrlLink;
