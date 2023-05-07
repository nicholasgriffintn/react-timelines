import { render, act, fireEvent } from "@testing-library/react";

import Timeline from ".";
import createTime from "../../utils/time";

import { StickySettings, TimebarEntry } from "../../types";

jest.mock("../../utils/getMouseX");

type TimelineProps = React.ComponentProps<typeof Timeline>;

const time = createTime({
  start: new Date("2018-01-01"),
  end: new Date("2019-01-01"),
  zoom: 1,
});

function createStickySettings(
  baseValues: Partial<StickySettings> = {}
): StickySettings {
  const {
    isSticky = false,
    setHeaderHeight = jest.fn(),
    handleHeaderScrollY = jest.fn(),
    headerHeight = 0,
    viewportWidth = 0,
    scrollLeft = 0,
  } = baseValues;
  return {
    isSticky,
    setHeaderHeight,
    handleHeaderScrollY,
    headerHeight,
    viewportWidth,
    scrollLeft,
  };
}

const defaultTimebar: TimebarEntry[] = [
  {
    useAsGrid: true,
    id: "1",
    cells: [
      {
        id: "cell-1",
        end: new Date("2022-01-01"),
        start: new Date("2021-01-01"),
        title: "Cell 1",
      },
    ],
    style: {},
    title: "Default Timebar",
  },
];

function createTimelineProps(
  baseValues: Partial<TimelineProps> = {}
): TimelineProps {
  const {
    now = new Date(),
    timebar = defaultTimebar,
    tracks = [],
    sticky = createStickySettings(),
  } = baseValues;

  return {
    now,
    time,
    timebar,
    tracks,
    sticky,
  };
}

describe("<Timeline />", () => {
  it("renders <NowMarker />, <Header /> and <Body />", () => {
    const props = createTimelineProps();
    const wrapper = render(<Timeline {...props} />);

    expect(
      wrapper.container.querySelector(".rt-marker--now")
    ).toBeInTheDocument();
    expect(
      wrapper.container.querySelector(".rt-timeline__header")
    ).toBeInTheDocument();
    expect(
      wrapper.container.querySelector(".rt-timeline__body")
    ).toBeInTheDocument();
  });

  describe("markers", () => {
    it("does not render <PointerMarker /> when component mounts", () => {
      const props = createTimelineProps();
      const wrapper = render(<Timeline {...props} />);

      expect(
        wrapper.container.querySelectorAll(".rt-marker--pointer").length
      ).toBe(0);
    });

    it("renders <PointerMarker /> when component mounts", () => {
      const props = createTimelineProps();
      const wrapper = render(<Timeline {...props} />);

      act(() => {
        fireEvent.mouseMove(wrapper.container);
      });

      expect(
        wrapper.container.querySelector(".rt-marker--pointer")
      ).toBeInTheDocument();
    });
  });
});
