import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import App from "../src/App";

fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
  if (err) {
    console.log(`ERR> ${err}`);
    return res.status(500).send("Something went wrong!");
  }

  const app = express();

  const styles = new ServerStyleSheet();

  const toSend = data
    .replace(
      "ROOT_CONTENT_HERE",
      ReactDOMServer.renderToString(styles.collectStyles(<App />))
    )
    .replace("INLINE_STYLES_HERE", styles.getStyleTags());

  app.get("/", (_, res) => {
    return res.send(toSend);
  });

  app.use(express.static(path.resolve(__dirname, "..", "build")));

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});
