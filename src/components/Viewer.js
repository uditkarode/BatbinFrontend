import axios from "axios";
import React, { useEffect, useState } from "react";
import highlight from 'highlight.js';
import { useParams } from "react-router";
import "../../node_modules/highlight.js/styles/tomorrow-night.css";

export default function Viewer() {
  let { id } = useParams();
  const [content, setContent] = useState();

  useEffect(() => {
    async function getPaste() {
      try {
        const response = (await axios.get(`https://b.uditkaro.de/api/get?id=${id}`)).data;
        if(response.status === "failure") {
          setContent(response.message);
        } else {
          setContent(response);
        }
      } catch(e) {
        setContent("Failed to get paste!");
      }
    }

    getPaste();
  }, [id]);

  useEffect(() => {
    highlight.highlightAll();
  }, [content]);

  if(content !== undefined) {
    return (
      <div style={{ marginLeft: 15 }}>
        <pre>
            <code style={{ fontFamily: "Fira Mono", color: "#fbfbfb" }}>
              {content}
            </code>
        </pre>
      </div>
    );
  } else {
    return <h1 style={{ fontFamily: 'Fira Mono', color: "#fbfbfb" }}>Loading...</h1>
  }
}
