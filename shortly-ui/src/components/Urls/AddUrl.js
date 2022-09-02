import React, { useState } from "react";
import classes from "./AddUrl.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import axios from "axios";

//GET longUrl collection
export const getShortUrl = async (longUrl, method) => {
  try {
    const res = await axios.post("/shorten", {
      longUrl: longUrl,
      encodeMethod: method,
    });
    return res.data;
  } catch (err) {}
};

const AddUrl = (props) => {
  const [enteredUrl, setEnteredUrl] = useState("");
  const [selectedMethod, setSelecttedMethod] = useState("random");

  const addUrlHandler = async (e) => {
    e.preventDefault();
    if (enteredUrl.trim().length === 0) {
      return;
    }
    const url = await getShortUrl(enteredUrl, selectedMethod);
    props.onShortenUrl(url);
    setEnteredUrl("");
  };

  const urlChangeHandler = (e) => {
    setEnteredUrl(e.target.value);
  };
  const methodSelectHandler = (e) => {
    setSelecttedMethod(e.target.value);
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUrlHandler}>
        {/* <label htmlFor="url"></label> */}
        <input
          id="url"
          type="text"
          onChange={urlChangeHandler}
          placeholder="Shorten your link"
          value={enteredUrl}
        ></input>
        <Button type="submit">Shorten</Button>
        <label htmlFor="encodingMethod">Choose a encoding method:</label>
        <select
          id="encodingMethod"
          value={selectedMethod}
          onChange={methodSelectHandler}
        >
          <option value="random">random</option>
          <option value="base62">base62</option>
        </select>
      </form>
    </Card>
  );
};
export default AddUrl;
