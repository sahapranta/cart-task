import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ProductCard from "../components/ProductCard";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
    const product = {
        name:'Some Name',
        price:12,
        quantity:5
    };    
  act(() => {
    render(<ProductCard product={product}/>, container);
  });
  expect(container.textContent).toBe(`${product.name}Quantity: 1kg$${product.price}`);
});
