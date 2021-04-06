import "./App.css";
import React, { useRef } from "react";
import TopBar from "./components/TopBar";
import Editor from "./components/Editor";
import Viewer from "./components/Viewer";
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  const editorRef = useRef(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", overflowX: 'hidden', height: "100%" }}>
      <TopBar editorRef={editorRef} />
      <BrowserRouter>
        <Route exact path="/" render={(props) => <Editor editorRef={editorRef} {...props} />} />
        <Route path="/fetch/:id" render={(props) => <Viewer {...props} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
