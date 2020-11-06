import { withAuthenticator } from "@aws-amplify/ui-react";
import { Input } from "antd";
import { useState } from "react";
import "./App.css";
import axios from "axios";

import FileTable from "./components/FileTable";

import FileUpload from "./components/FileUpload";

const { Search } = Input;

function App() {
  const [files, setFiles] = useState([]);

  const onLoad = (value) => {
    axios
      .get(
        `https://search-topothesia-xgm2eh7g25z5qqkjpvlfmzqjve.eu-central-1.es.amazonaws.com/documents/_search?pretty=&size=20`
      )
      .then((res) => {
        let arr = [];
        let hits = res.data.hits.hits;

        for (let i = 0; i < hits.length; i++) {
          arr = [
            ...arr,
            {
              key: hits[i]._id,
              title: hits[i]._source.title,
              filename: hits[i]._source.filename,
              author: hits[i]._source.author,
              created: hits[i]._source.created,
              pages: hits[i]._source.numberOfPages,
            },
          ];
        }

        setFiles(arr);
      });
  };

  const onSearch = () => {
    
  }

  onLoad();

  return (
    <div className="App">
      <FileUpload />
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={() => onSearch()}
        style={{ marginBottom: 16 }}
      />
      <FileTable data={files} />
    </div>
  );
}

export default withAuthenticator(App);
