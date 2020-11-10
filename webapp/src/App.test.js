import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders correctly", () => {
  render(<App />);
  const linkElement = screen.getByText(/Sign in to your account/i);
  expect(linkElement).toContain('Sign in to your account');
});
