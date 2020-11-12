import * as React from "react";
import * as ReactDOM from "react-dom";
import FileUpload from "../FileUpload";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FileUpload />, div);
});

test("renders fileupload correctly", () => {
  const div = document.createElement("div");
  const { getByTestId } = render(<FileUpload />, div);
  expect(getByTestId("fileupload").textContent).toBe("Upload");
});

test("renders fileupload-uploadbutton correctly", () => {
  const div = document.createElement("div");
  const { getByTestId } = render(<FileUpload />, div);

  expect(getByTestId("fileuploadUploadButton")).toBeTruthy();
});

test("button toggles dragger", () => {
  const div = document.createElement("div");
  const { getByTestId, getByText } = render(<FileUpload />, div);

  const leftClick = { button: 1 };
  const button = getByText("Upload");

  //toggle Dragger (show)
  fireEvent.click(button, leftClick);
  let dragger = getByText("Click or drag file to this area to upload");
  expect(dragger).toBeTruthy();

  //toggle Dragger (hide)
  fireEvent.click(button, leftClick);
  dragger = screen.queryByText("Click or drag file to this area to upload");
  expect(dragger).toBeFalsy();
});
