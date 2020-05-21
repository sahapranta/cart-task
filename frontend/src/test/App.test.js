import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
// import { act, ShallowRenderer } from "react-dom/test-utils";
// import TestRenderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });



test("renders base element with navbar and cards", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/navbar/i);
  expect(linkElement).toBeInTheDocument();
});

test("should call api", () => {
  const fakeProducts = [
    {
      name: "Some Name",
      price: 12,
      quantity: 5
    }
  ];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeProducts)
    })
  );  
  const wrapper = shallow(<App />);
  expect(wrapper.state().products).toEqual(fakeProducts);
  // const card = getByText(/some name/i);
  // expect(card).toBeInTheDocument();
  global.fetch.mockRestore();
});
