import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";


it("render w/o crashing", function () {
  render(<Snowman />);
});

it("matches snapshot", function () {
  const { container, debug } = render(<Snowman />);
  expect(container).toMatchSnapshot();
});

it("should test end game on loss", function () {
  const { container, debug } = render(<Snowman maxWrong={6} words={["apple"]} />);



  // click 6 incorrect guesses
  fireEvent.click(container.querySelector("button[value='b']"));
  fireEvent.click(container.querySelector("button[value='c']"));
  fireEvent.click(container.querySelector("button[value='d']"));
  fireEvent.click(container.querySelector("button[value='f']"));
  fireEvent.click(container.querySelector("button[value='g']"));
  fireEvent.click(container.querySelector("button[value='h']"));

  debug(container)

  expect(container).toContainHTML("You lose");
  expect(container).toContainHTML("apple");
  expect(container).not.toContainHTML("button");

  expect(container).toMatchSnapshot();
});
