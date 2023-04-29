import { render } from '@testing-library/react'

import PointerMarker from './PointerMarker'
import createTime from '@src/utils/time'

const time = createTime({
  start: new Date('2017-01-01'),
  end: new Date('2018-01-01'),
  zoom: 1,
})

describe('<PointerMarker />', () => {
  const props = {
    time,
    date: new Date('2017-01-02'),
    visible: false,
    highlighted: false,
  }

  it('renders <Marker /> passing down horizontal position', () => {
    const wrapper = render(<PointerMarker {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-marker')[0]).toHaveAttribute('x', 1)
  })
})
