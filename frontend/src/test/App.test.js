import React from "react";
import { render } from "@testing-library/react";
import App from "../App";



test("renders base element with navbar and cards", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/navbar/i);
  expect(linkElement).toBeInTheDocument();
});