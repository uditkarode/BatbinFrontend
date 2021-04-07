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
            axios.post('https://b.uditkaro.de/api/set', form).then(result => {
              if(result.success === "true") {
                window.location = `https://b.uditkaro.de/api/fetch/${result.data.message}`;
              } else {
                alert(result.message);
              }
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
