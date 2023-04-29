import { MouseEventHandler } from "react";

import Toggle from "../../components/Controls/Toggle";
import ZoomIn from "../../components/Controls/ZoomIn";
import ZoomOut from "../../components/Controls/ZoomOut";
import setDefaultProperties, {
  DefaultProperties,
} from "../../utils/setDefaultProperties";
import noop from "../../utils/noop";

interface Props {
  isOpen?: boolean;
  toggleOpen?: MouseEventHandler<HTMLButtonElement>;
  zoom: number;
  zoomIn?: MouseEventHandler<HTMLButtonElement>;
  zoomMax?: number;
  zoomMin?: number;
  zoomOut?: MouseEventHandler<HTMLButtonElement>;
}

const DEFAULT_PROPERTIES: DefaultProperties<Props> = {
  isOpen: true,
  toggleOpen: noop,
  zoomIn: noop,
  zoomMax: 0,
  zoomMin: 0,
  zoomOut: noop,
};

export default function Controls(props: Props) {
  const { isOpen, toggleOpen, zoom, zoomIn, zoomMax, zoomMin, zoomOut } =
    setDefaultProperties(props, DEFAULT_PROPERTIES);
  return (
    <div className="rt-controls">
      <div className="rt-controls__content">
        {toggleOpen && <Toggle isOpen={isOpen} toggleOpen={toggleOpen} />}
        {zoomIn && <ZoomIn zoomIn={zoomIn} zoomMax={zoomMax} zoom={zoom} />}
        {zoomOut && <ZoomOut zoomOut={zoomOut} zoomMin={zoomMin} zoom={zoom} />}
      </div>
    </div>
  );
}
