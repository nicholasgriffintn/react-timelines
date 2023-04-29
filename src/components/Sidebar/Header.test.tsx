import { render, screen } from "@testing-library/react";

import Header from "./Header";

const defaultSticky = {
  isSticky: false,
  sidebarWidth: 0,
  headerHeight: 0,
};

const defaultProps = {
  timebar: [],
  sticky: { ...defaultSticky },
};

describe("<Header />", () => {
  it("renders the title for each row", () => {
    const timebar = [
      { id: "1", title: "row-1" },
      { id: "1", title: "row-2" },
    ];
    const props = { ...defaultProps, timebar };
    render(<Header {...props} />);

    expect(screen.getByText("row-1")).toBeInTheDocument();
    expect(screen.getByText("row-2")).toBeInTheDocument();
  });

  it("reserves the space taken up by the header when it is sticky", () => {
    const sticky = {
      ...defaultSticky,
      isSticky: true,
      headerHeight: 100,
    };
    const props = { ...defaultProps, sticky };
    const wrapper = render(<Header {...props} />);

    expect(wrapper.container.querySelector(".rt-sidebar__header")).toHaveStyle(
      "padding-top: 100px"
    );
  });

  it("does not reserve the space taken up by the header when it is static", () => {
    const sticky = {
      ...defaultSticky,
      isSticky: false,
      headerHeight: 100,
    };
    const props = { ...defaultProps, sticky };
    const wrapper = render(<Header {...props} />);
    expect(
      wrapper.container.querySelector(".rt-sidebar__header")
    ).not.toHaveStyle("padding-top: 100px");
  });

  it("becomes sticky when it receives a sticky prop", () => {
    const sticky = {
      ...defaultSticky,
      isSticky: true,
      sidebarWidth: 200,
    };
    const props = { ...defaultProps, sticky };
    const wrapper = render(<Header {...props} />);

    expect(wrapper.container.querySelector(".rt-sidebar__header")).toHaveClass(
      "rt-is-sticky"
    );
    expect(wrapper.container.querySelector(".rt-sidebar__header")).toHaveStyle(
      "width: 200px"
    );
  });

  it("becomes static when it receives a falsy sticky prop", () => {
    const sticky = {
      ...defaultSticky,
      isSticky: false,
      sidebarWidth: 200,
    };
    const props = { ...defaultProps, sticky };
    const wrapper = render(<Header {...props} />);

    expect(
      wrapper.container.querySelector(".rt-sidebar__header")
    ).not.toHaveClass("rt-is-sticky");
    expect(
      wrapper.container.querySelector(".rt-sidebar__header")
    ).not.toHaveStyle("width: 200px");
  });
});
