import { render } from "@testing-library/react";

import Sidebar from ".";

describe("<Sidebar />", () => {
  it("renders <Header /> and <Body />", () => {
    const props = {
      timebar: [],
      tracks: [
        {
          id: "1",
          title: "Track 1",
          elements: [],
        },
      ],
      toggleTrackOpen: jest.fn(),
    };
    const wrapper = render(<Sidebar {...props} />);

    expect(
      wrapper.container.getElementsByClassName("rt-sidebar__header")[0]
    ).toBeInTheDocument();
    expect(
      wrapper.container.getElementsByClassName("rt-sidebar__body")[0]
    ).toBeInTheDocument();
  });
});
