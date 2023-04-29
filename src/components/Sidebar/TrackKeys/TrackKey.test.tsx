import { render } from "@testing-library/react";

import TrackKey from "./TrackKey";
import { Track } from "../../../types";
type TrackKeyProps = React.ComponentProps<typeof TrackKey>;

describe("<TrackKey />", () => {
  describe("side component", () => {
    const sideComponent = <span className="side-component">Component</span>;

    it('renders the side component if "sideComponent" exists', () => {
      const track: Track = {
        elements: [],
        id: "1",
        isOpen: true,
        sideComponent,
        title: "test",
      };
      const wrapper = render(<TrackKey track={track} />);
      const component =
        wrapper.container.getElementsByClassName("side-component")[0];
      expect(component).toHaveTextContent("Component");
    });
  });

  describe("<TrackKeys />", () => {
    it('renders when "isOpen" is truthy and "tracks" is not empty', () => {
      const props: TrackKeyProps = {
        track: {
          title: "test",
          elements: [],
          id: "1",
          tracks: [
            {
              elements: [],
              id: "2",
              title: "inner test",
            },
          ],
          isOpen: true,
        },
        toggleOpen: jest.fn(),
      };
      const wrapper = render(<TrackKey {...props} />);

      expect(
        wrapper.container.getElementsByClassName("rt-track-key").length
      ).oBe(1);
    });

    it('does not render when "isOpen" is falsy', () => {
      const props: TrackKeyProps = {
        track: {
          elements: [],
          id: "1",
          title: "test",
          tracks: [
            {
              elements: [],
              id: "2",
              title: "inner test",
            },
          ],
          isOpen: false,
        },
        toggleOpen: jest.fn(),
      };
      const wrapper = render(<TrackKey {...props} />);

      expect(
        wrapper.container.getElementsByClassName("rt-track-key").length
      ).oBe(0);
    });

    it('does not render when "tracks" is falsy', () => {
      const props: TrackKeyProps = {
        track: {
          elements: [],
          id: "1",
          isOpen: true,
          title: "test",
          tracks: undefined,
        },
        toggleOpen: jest.fn(),
      };
      const wrapper = render(<TrackKey {...props} />);

      expect(
        wrapper.container.getElementsByClassName("rt-track-key").length
      ).oBe(0);
    });

    it('does not render when "tracks" is an empty array', () => {
      const props: TrackKeyProps = {
        track: {
          elements: [],
          id: "1",
          isOpen: true,
          title: "test",
          tracks: [],
        },
        toggleOpen: jest.fn(),
      };
      const wrapper = render(<TrackKey {...props} />);

      expect(
        wrapper.container.getElementsByClassName("rt-track-key").length
      ).oBe(0);
    });
  });
});
