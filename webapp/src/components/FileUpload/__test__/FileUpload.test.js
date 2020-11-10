import * as React from "react";
import * as ReactDOM from "react-dom";
import FileUpload from "../FileUpload";
import { render, screen } from "@testing-library/react";
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
