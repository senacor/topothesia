import * as React from "react";
import * as ReactDOM from "react-dom";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FileTable from "../FileTable";

const testEmpty = [];

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

test("renders filetable-downloadbutton correctly", () => {
  const div = document.createElement("div");
  const { getByTestId } = render(<FileTable data={testData} />, div);

  expect(getByTestId("filetableDownloadButton")).toBeTruthy();
});

test("renders filetable-table correctly", () => {
  const div = document.createElement("div");
  const { getByTestId } = render(<FileTable data={testData} />, div);

  expect(getByTestId("filetableTable")).toBeTruthy();
});

test("check all files activates download", () => {
  const div = document.createElement("div");
  const { container, getAllByTestId } = render(<FileTable data={testData} />, div);

  //get the check all checkbox
  const checkboxCheckAll = container.querySelector('input[type="checkbox"].ant-checkbox-input');
  //get the download button
  const buttonDownload = getByTestId(container, 'filetableDownloadButton');
  
  expect(checkboxCheckAll).toBeInTheDocument();
  expect(checkboxCheckAll).not.toBeChecked();
  expect(buttonDownload).toHaveAttribute('disabled');

  //click the select all checkbox
  const leftClick = { button: 1 };
  fireEvent.click(checkboxCheckAll, leftClick);

  expect(checkboxCheckAll).toBeChecked();
  expect(buttonDownload).not.toHaveAttribute('disabled');
});