import React from "react";
import { Button } from "@primer/components";
import axios from 'axios';
import FormData from 'form-data';

export default function TopBar({ editorRef }) {
  const tagColor = { color: "#6BA2F0" };

  return (
    <div
      className="shadow-2xl"
      style={{
        width: "100%",
        backgroundColor: "#010101",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <h2 style={{ color: "#fbfbfb", fontFamily: "Fira Mono" }}>
        <span style={tagColor}>&lt;</span>BatBin
        <span style={tagColor}>/&gt;</span>
      </h2>

      <div>
        <Button backgroundColor="#1f61c8" color="#fbfbfb" style={{ marginRight: 10 }} onClick={async () => {
          try {
            const form = new FormData();
            form.append('content', editorRef.current.value);
            axios.post('http://localhost:3849/set', form).then(result => {
              console.log(result.data);
            }).catch(e => {
              console.log("ERR>" + e);
            });
          } catch(e) {
            console.log(e.message);
          }
        }}>
          Save
        </Button>
      </div>
    </div>
  );
}
