import { render } from '@testing-library/react'
import createTime from '../../../utils/time'

import Tracks from '.'

describe('<Tracks />', () => {
  it('renders <Track /> components', () => {
    const props = {
      time: createTime({
        start: new Date('2017-01-01'),
        end: new Date('2018-01-01'),
        zoom: 1,
      }),
      tracks: [
        { id: '1', elements: [], title: '' },
        { id: '2', elements: [], title: '' },
      ],
    }
    const wrapper = render(<Tracks {...props} />)

    expect(wrapper.container.getElementsByClassName('tr-track').length).toBe(2)
  })
})
