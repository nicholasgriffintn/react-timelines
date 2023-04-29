import { render, screen } from '@testing-library/react'

import Body from './Body'
import TrackKeys from '.'
type BodyProps = React.ComponentProps<typeof Body>

describe('<Body />', () => {
  it('renders <TrackKeys />', () => {
    const props: BodyProps = {
      tracks: [
        {
          id: '1',
          title: 'Track 1',
          elements: [],
        },
      ],
      toggleTrackOpen: jest.fn(),
    }
    const wrapper = render(<Body {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-sidebar__body')[0]).toBeInTheDocument()
  })
})
