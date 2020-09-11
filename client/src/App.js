import React from "react";
import "./App.css";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
// import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import EditorJS from "@editorjs/editorjs";

function App() {
  const editor = new EditorJS({
    holder: "App",
    tools: {
      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+O",
        config: {
          quotePlaceholder: "Enter a quote",
          captionPlaceholder: "Quote's author",
        },
      },
      list: List,
      header: Header,
      table: Table,
      embed: Embed,
      delimiter: Delimiter,
      Marker: {
        class: Marker,
        shortcut: "CMD+SHIFT+M",
      },
      checklist: {
        class: CheckList,
        inlineToolbar: true,
      },
      image: {
        class: Image,
        config: {
          field: "photo",
          endpoints: {
            byFile: "http://localhost:8000/upload", // Your backend file uploader endpoint
            byUrl: "http://localhost:8000/upload", // Your endpoint that provides uploading by Url
          },
        },
      },
    },
  });
  // useEffect(() => {

  // });

  const logData = () => {
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };
  return (
    <>
      <div className="App" id="App"></div>
      <button
        style={{ margin: "auto", display: "block", height: "3rem" }}
        onClick={logData}
      >
        Log Data
      </button>
    </>
  );
}

export default App;
