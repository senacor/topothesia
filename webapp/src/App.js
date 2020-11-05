import logo from "./logo.svg";
import "./App.css";
import { Input } from "antd";
import { useState } from "react";

import FileTable from "./components/FileTable";

const { Search } = Input;

const onSearch = (value) => {
  console.log(value);
};

function App() {
  return (
    <div className="App">
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
}

export default App;
