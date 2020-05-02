import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import mockData from "../../data/weather.json";
import { WeatherResult, celciusToKelvin } from "./WeatherResult";

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

describe("Given a WeatherResult component with a searchHistory prop", () => {
  it("renders correctly", () => {
    act(() => {
      render(
        <WeatherResult
          searchItem={mockData}
          searchHistory={true}
          wantsKelvin={false}
        />,
        container
      );
    });
    expect(container.firstChild).toMatchSnapshot();
    expect(container.textContent.toBeDefined);
  });
});

describe("Given a WeatherResult component", () => {
  it("renders correctly", () => {
    act(() => {
      render(
        <WeatherResult
          searchItem={mockData}
          searchHistory={false}
          wantsKelvin={false}
        />,
        container
      );
    });
    expect(container.firstChild).toMatchSnapshot();

    // test the component renders the city name, temp, pressure and humidity in the mock response
    expect(container.textContent.toBeDefined);
    expect(container.textContent).toContain("London");
    expect(container.textContent).toContain("285.59");
    expect(container.textContent).toContain("1032 hpa");
    expect(container.textContent).toContain("71 %");
  });
});

describe("Given a WeatherResult component, displaying temperature in Kelvin", () => {
  it("renders correctly", () => {
    act(() => {
      render(
        <WeatherResult
          searchItem={mockData}
          searchHistory={false}
          wantsKelvin={true}
        />,
        container
      );
    });
    expect(container.firstChild).toMatchSnapshot();
    expect(container.textContent.toBeDefined);
    expect(container.textContent).toContain("London");
    expect(container.textContent).toContain(celciusToKelvin(285.59));
    expect(container.textContent).toContain("1032 hpa");
    expect(container.textContent).toContain("71 %");
  });
});
