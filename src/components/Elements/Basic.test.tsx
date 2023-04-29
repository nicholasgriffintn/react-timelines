import { render, screen } from "@testing-library/react";

import Basic from "../../components/Elements/Basic";

type BasicProps = React.ComponentProps<typeof Basic>;

const defaultProps: BasicProps = {
  classes: [],
  dataSet: {},
  end: new Date("2017-02-01"),
  start: new Date("2017-01-01"),
  style: {},
  title: "Timeline Item",
  tooltip: "",
};

describe("<Basic />", () => {
  describe("Title", () => {
    it("should apply style to title", () => {
      const props = { ...defaultProps, titleStyle: { fontWeight: "bold" } };
      render(<Basic {...props} />);

      expect(screen.getByText("Timeline Item")).toHaveStyle(
        "font-weight: bold"
      );
    });
  });

  describe("Tooltip", () => {
    it("renders the tooltip value if it exists", () => {
      const tooltip = "Test tooltip";
      const props = { ...defaultProps, tooltip };
      render(<Basic {...props} />);

      expect(screen.getByText("Test tooltip")).toBeInTheDocument();
    });

    it("should apply style to tooltip", () => {
      const props = {
        ...defaultProps,
        tooltip: "Test Tooltip",
        tooltipStyle: { backgroundColor: "orange" },
      };
      render(<Basic {...props} />);

      expect(screen.getByText("Test tooltip")).toHaveStyle(
        "background-color: orange"
      );
    });

    it("handles multiline tooltips", () => {
      const tooltip = "Test\ntooltip";
      const props = { ...defaultProps, tooltip };
      render(<Basic {...props} />);

      expect(screen.getByText("Test\ntooltip")).toBeInTheDocument();
    });

    it("can take an optional list of classnames to add to the parent", () => {
      const props = { ...defaultProps, classes: ["foo", "bar"] };
      const wrapper = render(<Basic {...props} />);

      expect(
        wrapper.container.getElementsByClassName("rt-element")[0]
      ).toHaveClass("foo");
      expect(
        wrapper.container.getElementsByClassName("rt-element")[0]
      ).toHaveClass("bar");
    });
  });
});
