import axios from "axios";
import React, { useEffect, useState } from "react";
import Highlight from "react-highlight";
import { useParams } from "react-router";
import "../../node_modules/highlight.js/styles/tomorrow-night.css";

export default function Viewer() {
  let { id } = useParams();
  const [content, setContent] = useState();

  useEffect(() => {
    async function getPaste() {
      try {
        const response = (await axios.get(`http://localhost:3849/get?id=${id}`)).data;
        if(response.status === "failure") {
          console.log(response);
          setContent(response.message);
        } else {
          console.log("ye me doing this")
          setContent(response);
        }
      } catch(e) {
        setContent("Failed to get paste!");
      }
    }

    getPaste();
  }, [id]);

  if(content !== undefined) {
    return (
      <div style={{ marginLeft: 15 }}>
        <Highlight>
          <p style={{ fontFamily: 'Fira Mono' }}>
            {content}
          </p>
        </Highlight>
      </div>
    );
  } else {
    return <h1 style={{ fontFamily: 'Fira Mono' }}>Loading...</h1>
  }
}
