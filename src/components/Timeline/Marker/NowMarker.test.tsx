import { render } from "@testing-library/react";

import NowMarker from "./NowMarker";
import createTime from "../../../utils/time";

const createProps = ({
  now = new Date(),
  time = createTime({
    start: new Date(),
    end: new Date(),
    zoom: 1,
  }),
  visible = true,
}) => ({ now, time, visible });

describe("<NowMarker />", () => {
  it("renders <Marker /> whose position is calculated from the time", () => {
    const props = createProps({
      now: new Date("2017-01-01"),
      time: createTime({
        start: new Date("2016-01-01"),
        end: new Date("2018-01-10"),
        zoom: 1,
      }),
    });
    const wrapper = render(<NowMarker {...props} />);

    expect(
      wrapper.container.getElementsByClassName("rt-marker")[0]
    ).toHaveAttribute("x", 366);
  });
});
