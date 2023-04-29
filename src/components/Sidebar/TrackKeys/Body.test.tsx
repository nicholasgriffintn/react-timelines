import { render } from "@testing-library/react";

import Body from "./Body";
type BodyProps = React.ComponentProps<typeof Body>;

describe("<Body />", () => {
  it("renders <TrackKeys />", () => {
    const props: BodyProps = {
      tracks: [
        {
          id: "1",
          title: "Track 1",
          elements: [],
        },
      ],
      toggleTrackOpen: jest.fn(),
    };
    const wrapper = render(<Body {...props} />);

    expect(
      wrapper.container.querySelectorAll(".rt-sidebar__body")[0]
    ).toBeInTheDocument();
  });
});
