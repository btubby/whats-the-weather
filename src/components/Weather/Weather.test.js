import React from 'react';
import { Weather } from './Weather';

function nameToUppercase(name) {
  return name.toUpperCase();
}

describe("Given a Weather component", () => {
  it("returns the uppercase `example`", () => {
    expect(nameToUppercase("example")).toBe("EXAMPLE");
  });

  // TODO: Write tests for your ** components **
  // it('should match the snapshot', () => {
  //   const tree = renderer.create(<Weather />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});

