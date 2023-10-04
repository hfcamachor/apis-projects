const express = require("express");
const app = express();
const PORT = 8000;
require("dotenv").config();
const crypto = require("crypto-js");
const cors = require("cors");
app.use(cors());

const marvelApiBase = process.env.MARVEL_API_BASE;
const marvelPublicKey = process.env.MARVEL_PUBLIC_KEY;
const marvelPrivateKey = process.env.MARVEL_PRIVATE_KEY;

const ts = new Date().getTime();
const hash = crypto.MD5(ts + marvelPrivateKey + marvelPublicKey).toString();

const myQuery = (queries) => {
  return Object.keys(queries).reduce((queryString, curr) => {
    const separator = queryString ? "&" : "";
    return `${queryString}${separator}${curr}=${queries[curr]}`;
  }, "");
};

app.get("/marvel", async (req, res) => {
  const extraQuery = myQuery(req.query);
  try {
    const response = await fetch(
      `${marvelApiBase}/characters?ts=${ts}&apikey=${marvelPublicKey}&hash=${hash}&${extraQuery}`
    );
    if(!response.ok) {
      res.send(response.statusText)
    }
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error)
  }
});

app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
