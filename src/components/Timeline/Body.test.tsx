import React from 'react'
import { render } from '@testing-library/react'

import Body from './Body'
import createTime from '@src/utils/time'

type BodyProps = React.ComponentProps<typeof Body>

const defaultProps: BodyProps = {
  time: createTime({
    start: new Date(),
    end: new Date(),
    zoom: 1,
  }),
  grid: [],
  tracks: [],
}

describe('<Body />', () => {
  it('renders <Tracks />', () => {
    const wrapper = render(<Body {...defaultProps} />)

    expect(wrapper.container.getElementsByClassName('rt-tracks').length).toBe(1)
  })

  it('renders <Grid /> if grid prop exists', () => {
    const wrapper = render(<Body {...defaultProps} />)

    expect(wrapper.container.getElementsByClassName('rt-grid').length).toBe(1)
  })

  it('does not render <Grid /> if grid prop does not exist', () => {
    const props = {
      ...defaultProps,
      grid: undefined,
    }
    const wrapper = render(<Body {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-grid').length).toBe(0)
  })
})
