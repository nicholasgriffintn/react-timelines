import { Track } from "../../../types";
import setDefaultProperties, {
  DefaultProperties,
} from "../../../utils/setDefaultProperties";
import TrackKeys from "./TrackKeys";

interface Props {
  tracks?: Track[];
  toggleTrackOpen?: (track: Track) => void;
  clickTrackButton?: (track: Track) => void;
}

const DEFAULT_PROPS: DefaultProperties<Props> = {
  tracks: [],
  toggleTrackOpen: () => {},
  clickTrackButton: () => {},
};

export default function Body(props: Props): JSX.Element {
  const { tracks, toggleTrackOpen, clickTrackButton } = setDefaultProperties(
    props,
    DEFAULT_PROPS
  );
  return (
    <div className="rt-sidebar__body">
      <TrackKeys
        tracks={tracks}
        toggleOpen={toggleTrackOpen}
        clickTrackButton={clickTrackButton}
      />
    </div>
  );
}
