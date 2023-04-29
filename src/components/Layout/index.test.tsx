import { render } from "@testing-library/react";

import Layout from ".";
import createTime from "../../utils/time";
import computedStyle from "../../utils/computedStyle";
import raf from "../../utils/raf";

type LayoutProps = React.ComponentProps<typeof Layout>;

jest.mock("../../utils/computedStyle");
jest.mock("../../utils/events");
jest.mock("../../utils/raf");

function createProps(baseValues: Partial<LayoutProps> = {}): LayoutProps {
  const fallbackTime = createTime({
    start: new Date(),
    end: new Date(),
    zoom: 1,
  });
  fallbackTime.fromX = jest.fn(() => new Date());
  fallbackTime.toX = jest.fn(() => 0);
  const {
    timebar = [],
    tracks = [],
    now = new Date(),
    isOpen = false,
    toggleTrackOpen = jest.fn(),
    enableSticky = true,
    onLayoutChange = jest.fn(),
    timelineViewportWidth = 1000,
    sidebarWidth = 200,
  } = baseValues;
  const time = baseValues.time || fallbackTime;

  return {
    timebar,
    time,
    tracks,
    now,
    isOpen,
    toggleTrackOpen,
    enableSticky,
    onLayoutChange,
    timelineViewportWidth,
    sidebarWidth,
  };
}

describe("<Layout />", () => {
  beforeEach(() => {
    (computedStyle as jest.Mock).mockImplementation((node) => ({
      getPropertyValue(prop: string) {
        return node.style[prop];
      },
    }));
    (raf as jest.Mock).mockImplementation((fn) => fn());
  });

  it("renders <Sidebar /> and <Timeline />", () => {
    const props = createProps();
    const wrapper = render(<Layout {...props} />);

    expect(wrapper.container.querySelectorAll(".rt-sidebar").length).toBe(1);
    expect(wrapper.container.querySelectorAll(".rt-timeline").length).toBe(1);
  });

  it("renders <Sidebar /> in an open state", () => {
    const props = createProps({ isOpen: true });
    const wrapper = render(<Layout {...props} />);

    expect(wrapper.container.querySelectorAll(".rt-layout")[0]).toHaveClass(
      "rt-layout rt-is-open"
    );
  });

  it("renders <Sidebar /> in a closed state", () => {
    const props = createProps({ isOpen: false });
    const wrapper = render(<Layout {...props} />);

    expect(wrapper.container.querySelectorAll(".rt-layout")[0]).not.toHaveClass(
      "rt-layout is-open"
    );
  });
});
