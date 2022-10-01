import React, { useState, useContext } from "react";
import classes from "./AddUrl.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import axios from "axios";
import AuthContext from "../../store/auth-context";
//GET longUrl collection
export const getShortUrl = async (longUrl, method, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const res = await axios.post(
      "/shorten",
      {
        longUrl: longUrl,
        encodeMethod: method,
      },
      config
    );
    return res.data;
  } catch (err) {}
};

const AddUrl = (props) => {
  const [enteredUrl, setEnteredUrl] = useState("");
  const [selectedMethod, setSelecttedMethod] = useState("random");
  const authCtx = useContext(AuthContext);

  const addUrlHandler = async (e) => {
    e.preventDefault();
    if (enteredUrl.trim().length === 0) {
      return;
    }
    console.log(authCtx.token);
    const shortUrl = await getShortUrl(
      enteredUrl,
      selectedMethod,
      authCtx.token
    );
    props.onShortenUrl({ longUrl: enteredUrl, shortUrl: shortUrl });
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
