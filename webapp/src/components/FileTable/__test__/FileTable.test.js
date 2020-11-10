import * as React from "react";
import * as ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FileTable from "../FileTable";

const testData = [
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
];

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FileTable data={testData} />, div);
});

test("renders filetable correctly", () => {
  const div = document.createElement("div");
  const { getByTestId } = render(<FileTable data={testData} />, div);
  //const res = screen.findAllByTestId('filetable');
  //expect(res.toHaveTextContent(testData[0].title));
  expect(getByTestId("filetable").textContent).toContain(testData[0].title);
});
