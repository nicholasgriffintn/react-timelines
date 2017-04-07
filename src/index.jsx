import React, { PropTypes, Component } from 'react'
import Sidebar from './components/Sidebar'
import Timeline from './components/Timeline'
import createTime from './utils/time'

class Container extends Component {

  constructor(props) {
    super(props)
    this.state = {
      time: createTime(props.scale)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scale !== this.props.scale) {
      this.setState({ time: createTime(nextProps.scale) })
    }
  }

  render() {
    return (
      <div className="react-timeline">
        <div className="layout">
          <div className="layout__side">
            <Sidebar tracks={this.props.tracks} />
          </div>
          <div className="layout__main">
            <Timeline
              now={this.props.now}
              time={this.state.time}
              timebar={this.props.timebar}
              tracks={this.props.tracks}
            />
          </div>
        </div>
      </div>
    )
  }
}

Container.propTypes = {
  now: PropTypes.instanceOf(Date),
  scale: PropTypes.shape({}).isRequired,
  timebar: PropTypes.shape({}).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

export default Container
