import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import axios from "axios";




function App() {

  const [json_file, setJson_file] = useState(null);
  const [new_file, setnew_file] = useState({});
  
//API get json file
  const fetchFile = async () => {
    let data = await axios.get('http://localhost:5000/get-file');
    let file = data.data;
    console.log(file);
    setJson_file(file);
  }

  const handleChange = (v) => {
    setnew_file({ ...v });
  };
//post JSON 
  const saveFile = async () => {
    let res = axios.post('http://localhost:5000/save-file', { "new_file": new_file })
    alert("saved successfully")
  }

  useEffect(() => {
    fetchFile();
  }, [])

  return (
    <div className="App">
      {(json_file) && <Editor key={json_file} value={json_file} onChange={handleChange} />}
      <button onClick={() => { saveFile() }} className="btn">save file</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
