import React, { useState } from "react";
import AddUrl from "./components/Urls/AddUrl";
import UrlLists from "./components/Urls/UrlLists";

function App() {
  const [urlLists, setUrlLists] = useState([]);

  const shortenUrlHandler = (url) => {
    setUrlLists((prevUrlList) => {
      const { id, longUrl, shortUrl } = url;
      return [
        ...prevUrlList,
        {
          id: id,
          longUrl: longUrl,
          shortUrl: shortUrl,
        },
      ];
    });
  };
  return (
    <div className="App">
      <AddUrl onShortenUrl={shortenUrlHandler}></AddUrl>
      <UrlLists urls={urlLists}></UrlLists>
    </div>
  );
}

export default App;
