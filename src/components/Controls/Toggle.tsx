import { MouseEventHandler } from "react";

const CloseSvg = () => (
  <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="evenodd">
      <rect
        width="56"
        height="8"
        rx="4"
        transform="rotate(-45 56.335 16.263)"
      />
      <rect width="56" height="8" rx="4" transform="rotate(45 -.707 15.364)" />
    </g>
  </svg>
);

const OpenSvg = () => (
  <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="evenodd">
      <rect width="46" height="8" rx="4" transform="translate(5 7)" />
      <rect width="46" height="8" rx="4" transform="translate(5 41)" />
      <rect width="46" height="8" rx="4" transform="translate(5 24)" />
    </g>
  </svg>
);

export interface Props {
  toggleOpen: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}
export default function Toggle(props: Props) {
  const { toggleOpen, isOpen } = props;
  return (
    <button
      className="rt-controls__button rt-controls__button--toggle"
      onClick={toggleOpen}
      type="button"
    >
      <span className="rt-visually-hidden">
        {isOpen ? "Close" : "Open"} Controls
      </span>
      {isOpen ? <CloseSvg /> : <OpenSvg />}
    </button>
  );
}
