import { render } from "@testing-library/react";
import createTime from "../../../utils/time";

import Timebar from ".";

describe("<Timebar />", () => {
  it("renders <Row /> components", () => {
    const props = {
      time: createTime({
        start: new Date("2017-01-01"),
        end: new Date("2018-01-01"),
        zoom: 1,
      }),
      rows: [
        { id: "1", cells: [], style: {}, title: "Title 1" },
        { id: "2", cells: [], style: {}, title: "Title 2" },
      ],
    };
    const wrapper = render(<Timebar {...props} />);

    expect(wrapper.container.querySelectorAll(".rt-timebar__row").length).toBe(
      2
    );
  });
});
