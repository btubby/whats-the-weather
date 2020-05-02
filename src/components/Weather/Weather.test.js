import React from 'react';
import { Weather } from './Weather';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';

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

describe("Given a Weather component", () => {
  it('renders correctly', () => {
    act(() => {
      render(<Weather />, container);
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});

