import logo from "./logo.svg";
import "./App.css";
import { Input, Button} from "antd";
import { useState } from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import FileUpload from './components/FileUpload';

import FileTable from "./components/FileTable";
const { Search } = Input;

const onSearch = (value) => {
  console.log(value);
};

function App() {
  const [files, setFiles] = useState([
    {
      key: 1,
      title: "Test Document",
      filename: "test_document.pdf",
      author: "Test Author",
      pages: 254,
    },
    {
      key: 2,
      title: "Example Doc",
      filename: "examp_doc.pdf",
      author: "Examp Author",
      pages: 45,
    },
    {
      key: 3,
      title: "Test File",
      filename: "test_file.pdf",
      author: "Some Author",
      pages: 132,
    },
  ]);

  return (
    <div className="App">
      <div style={{ marginBottom: 16, width: 100 }}>
        <AmplifySignOut />
      </div>
      <FileUpload />
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ marginBottom: 16 }}
      />
      <FileTable data={files} />
    </div>
  );
}

export default withAuthenticator(App);