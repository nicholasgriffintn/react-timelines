import { render, screen } from '@testing-library/react'

import Cell from './Cell'
import createTime from '../../../utils/time'

describe('<Cell />', () => {
  const props = {
    time: createTime({
      start: new Date('2016-01-01'),
      end: new Date('2019-01-01'),
      zoom: 1,
    }),
    title: 'test',
    start: new Date('2017-01-01'),
    end: new Date('2018-01-01'),
  }

  it('renders the "title"', () => {
    render(<Cell {...props} />)

    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('renders with a calculated width and left position based on "start" and "end"', () => {
    const wrapper = render(<Cell {...props} />)

    expect(wrapper.container).toHaveStyle('left: 366px')
    expect(wrapper.container).toHaveStyle('width: 366px')
  })
})
