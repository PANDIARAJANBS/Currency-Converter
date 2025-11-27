import React from "react";
import { render } from "@testing-library/react";
import Timer from "../components/Timer";
import { act } from "react";

test("calls onExpire after countdown", async () => {
  const onExpire = jest.fn();

  render(<Timer onExpire={onExpire} duration={1} />);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1100));
  });

  expect(onExpire).toHaveBeenCalled();
});
