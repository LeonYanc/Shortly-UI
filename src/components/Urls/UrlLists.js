import React from "react";

import Card from "../UI/Card";
import UrlLink from "./UrlLink";
import classes from "./Urlist.module.css";

const UrlLists = (props) => {
  return (
    <Card className={classes.urls}>
      <ul>
        {props.urls.map((url) => (
          <UrlLink url={url} key={url.id}></UrlLink>
        ))}
      </ul>
    </Card>
  );
};

export default UrlLists;
