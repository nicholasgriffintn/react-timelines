import { render, act, fireEvent } from "@testing-library/react";

import Element from "./Element";
import createTime from "../../../utils/time";

describe("<Element />", () => {
  const defaultProps = {
    id: "1",
    time: createTime({
      start: new Date("2016-01-01"),
      end: new Date("2019-01-01"),
      zoom: 1,
    }),
    title: "test",
    start: new Date("2017-01-01"),
    end: new Date("2018-01-01"),
  };

  it('renders with a calculated width and left position based on "start" and "end"', () => {
    const wrapper = render(<Element {...defaultProps} />);

    expect(wrapper.container).toHaveStyle("left: 366px");
    expect(wrapper.container).toHaveStyle("width: 366px");
  });

  it("renders <BasicElement />", () => {
    const wrapper = render(<Element {...defaultProps} />);

    expect(
      wrapper.container.getElementsByClassName("rt-element")[0]
    ).toBeInTheDocument();
  });

  describe("clickElement", () => {
    it("renders with a cursor pointer style if callback is passed", () => {
      const props = { ...defaultProps };
      const wrapper = render(<Element {...props} clickElement={jest.fn()} />);

      expect(wrapper.container).toHaveStyle("cursor: pointer");
    });

    it("renders without cursor pointer style if callback is not passed", () => {
      const wrapper = render(<Element {...defaultProps} />);

      expect(wrapper.container).not.toHaveStyle("cursor: pointer");
    });

    it("gets called with props when clicked", () => {
      const clickElement = jest.fn();
      const props = { ...defaultProps, clickElement };
      const wrapper = render(
        <Element {...props} clickElement={clickElement} />
      );
      expect(clickElement).toHaveBeenCalledTimes(0);

      act(() => {
        fireEvent.click(wrapper.container);
      });

      expect(clickElement).toHaveBeenCalledTimes(1);
      expect(clickElement).toHaveBeenCalledWith(props);
    });
  });
});
