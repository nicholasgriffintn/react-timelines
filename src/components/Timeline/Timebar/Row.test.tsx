import { render, screen } from '@testing-library/react'

import createTime from '@src/utils/time'

import Row from './Row'
import Cell from './Cell'

describe('<Row />', () => {
  it('renders the <Cell /> components', () => {
    const props = {
      time: createTime({
        start: new Date('2017-01-01'),
        end: new Date('2018-01-01'),
        zoom: 1,
      }),
      style: {},
      cells: [
        {
          title: 'test',
          start: new Date(),
          end: new Date(),
          id: '1',
        },
        {
          title: 'test',
          start: new Date(),
          end: new Date(),
          id: '2',
        },
      ],
    }
    const wrapper = render(<Row {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-timebar__cell').length).toBe(2)
  })
})
