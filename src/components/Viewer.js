import axios from "axios";
import React, { useEffect, useState } from "react";
import highlight from 'highlight.js';
import { useParams } from "react-router";
import "../../node_modules/highlight.js/styles/atom-one-dark.css";

const getHtmlFromCode = (code, language) => {
  const retval = highlight
          .highlightAuto(code, language)
          .value
          .split('\n')
          .map((l, n) => {
            return `<tr><td class="line-number">${n+1}</td><td>${l}</td></tr>`;
          }).join('');

  return `<table>${retval}</table>`;
}

export default function Viewer() {
  let { id } = useParams();
  const [content, setContent] = useState();

  useEffect(() => {
    async function getPaste() {
      try {
        const [actualId, language] = id.split('.');
        const response = (await axios.get(`https://b.uditkaro.de/api/get?id=${actualId}`)).data;
        if(response.status === "failure") {
          setContent(response.message);
        } else {
          let lang;
          if(language) lang = [language];
          setContent(getHtmlFromCode(response + "\n\n", lang));
        }
      } catch(e) {
        setContent("Could not fetch paste!");
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
