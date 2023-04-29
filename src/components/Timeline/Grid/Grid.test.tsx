import { render } from "@testing-library/react";

import Grid from "./Grid";
import createTime from "../../../utils/time";

const time = createTime({
  start: new Date("2017-01-01T00:00:00.000Z"),
  end: new Date("2017-01-30T00:00:00.000Z"),
  zoom: 10, // 10px === 1 day
});

const grid = [
  {
    id: "1",
    start: new Date("2017-01-01T00:00:00.000Z"),
    end: new Date("2017-01-06T00:00:00.000Z"),
    title: "Cell 1",
  },
  {
    id: "2",
    start: new Date("2017-01-06T00:00:00.000Z"),
    end: new Date("2017-01-11T00:00:00.000Z"),
    title: "Cell 2",
  },
  {
    id: "3",
    start: new Date("2017-01-11T00:00:00.000Z"),
    end: new Date("2017-01-16T00:00:00.000Z"),
    title: "Cell 3",
  },
];

describe("<Grid />", () => {
  it("renders grid cells, the styling of each repesenting the start and end dates in the grid prop", () => {
    const wrapper = render(<Grid time={time} grid={grid} />);

    expect(wrapper.container.querySelectorAll(".rt-grid__cell")[0]).toHaveStyle({ left: "0px", width: "50px" });
    expect(wrapper.container.querySelectorAll(".rt-grid__cell")[1]).toHaveStyle({ left: "50px", width: "50px" });
    expect(wrapper.container.querySelectorAll(".rt-grid__cell")[2]).toHaveStyle({ left: "100px", width: "50px" });
  });
});
