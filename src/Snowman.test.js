import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";


it("render w/o crashing", function () {
  render(<Snowman />);
});

it("matches snapshot", function () {
  const { container, debug } = render(<Snowman
    maxWrong={6}
    words={["apple"]} />);
  expect(container).toMatchSnapshot();
});

it("should test end game on loss", function () {
  const { container, debug } = render(<Snowman
    maxWrong={6}
    words={["apple"]} />);

  // click 6 incorrect guesses
  fireEvent.click(container.querySelector("button[value='b']"));
  fireEvent.click(container.querySelector("button[value='c']"));
  fireEvent.click(container.querySelector("button[value='d']"));
  fireEvent.click(container.querySelector("button[value='f']"));
  fireEvent.click(container.querySelector("button[value='g']"));
  fireEvent.click(container.querySelector("button[value='h']"));

  debug(container);

  expect(container).toContainHTML("You lose");
  expect(container).toContainHTML("apple");
  expect(container).not.toContainHTML("button[value='h']");

  expect(container).toMatchSnapshot();
});


it("image changes on missed letter", function () {
  const { container, debug } = render(<Snowman
    maxWrong={6}
    words={["apple"]} />);

  // initial image
  expect(container).toContainHTML('alt="0"');

  //click incorrect letter
  fireEvent.click(container.querySelector("button[value='b']"));
  expect(container).not.toContainHTML('alt="0"');
  expect(container).toContainHTML('alt="1"');

  //click correct letter
  fireEvent.click(container.querySelector("button[value='a']"));
  expect(container).toContainHTML('alt="1"');
  expect(container).not.toContainHTML('alt="2"');
});

// function clickLetter(letter) {
//   return fireEvent.click(container.querySelector(`button[value='${letter}']`));
// }