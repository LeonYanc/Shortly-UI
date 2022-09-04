import React from "react";

import Card from "../UI/Card";
import UrlLink from "./UrlLink";
import classes from "./Urlist.module.css";

const UrlLists = (props) => {
  return (
    <Card className={classes.urls}>
      <ul>
        {props.urls.map((url, index) => (
          <UrlLink url={url} key={index}></UrlLink>
        ))}
      </ul>
    </Card>
  );
};

export default UrlLists;
