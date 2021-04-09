import axios from "axios";
import React, { useEffect, useState } from "react";
import highlight from 'highlight.js';
import { useParams } from "react-router";
import "../../node_modules/highlight.js/styles/tomorrow-night.css";

const getHtmlFromCode = code => {
  const retval = highlight
          .highlightAuto(code)
          .value
          .split('\n')
          .map((l, n) => {
            return `<tr><td class="line-number">${n+1}</td><td>${l}</td></tr>`
          });

  return `<table>${retval}</table>`
}

export default function Viewer() {
  let { id } = useParams();
  const [content, setContent] = useState();

  useEffect(() => {
    async function getPaste() {
      try {
        const response = (await axios.get(`https://b.uditkaro.de/api/get?id=${id}`)).data;
        if(response.status === "failure") {
          setContent(highlight.highlightAuto(response.message).value);
        } else {
          setContent(response);
        }
      } catch(e) {
        // setContent("Failed to get paste!");
        const kek = getHtmlFromCode(
          `const a = 4;
const b = 5;
const c = a + b;
console.log(c);`
        );
        
        setContent(kek);
      }
    }

    getPaste();
  }, [id]);

  if(content !== undefined) {
    return (
      <pre style={{ color: "#fbfbfb", paddingTop: 3, paddingLeft: 20, fontSize: 16, fontFamily: "Fira Mono, monospace" }} dangerouslySetInnerHTML={{__html: content}} />
    );
  } else {
    return <h1 style={{ fontFamily: 'Fira Mono', color: "#fbfbfb" }}>Loading...</h1>
  }
}
