import React from "react";
import Upload from "./Upload";
import FileList from "./FileList";

function App() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">📦 PicVault</h1>
      <Upload />
      <FileList />
    </div>
  );
}
//server
export default App;
