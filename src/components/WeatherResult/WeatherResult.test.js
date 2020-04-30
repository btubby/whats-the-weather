import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import mockData from '../../data/weather.json';
import { WeatherResult } from './WeatherResult';

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

it("renders", () => {
  act(() => {
    render(<WeatherResult response={mockData} />, container);
  });
  console.log(container.textContent)
  // test the component renders the city name, temp, pressure and humidity in the mock response
  expect(container.textContent.toBeDefined);
  expect(container.textContent).toContain('London');
  expect(container.textContent).toContain('285.59');
  expect(container.textContent).toContain('1032 hpa');
  expect(container.textContent).toContain('71 %');
  

});