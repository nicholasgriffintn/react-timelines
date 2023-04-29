import { render } from '@testing-library/react'

import Track from './Track'
import { ComponentPropsWithoutRef } from 'react'
import createTime from '@src/utils/time'

const DEFAULT_TIME = createTime({
  start: new Date('2017-01-01'),
  end: new Date('2018-01-01'),
  zoom: 1,
})

function createProps(values: Partial<ComponentPropsWithoutRef<typeof Track>>) {
  const {
    clickElement = createProps.mockClickElement,
    elements = [],
    isOpen = false,
    time = DEFAULT_TIME,
    tracks = [],
  } = values
  return {
    clickElement,
    elements,
    isOpen,
    time,
    tracks,
  }
}
createProps.mockClickElement = jest.fn()

describe('<Track />', () => {
  it('filters out <Element /> components where "start" is after "end"', () => {
    const props = createProps({
      elements: [
        {
          id: '1',
          altId: '1',
          start: new Date('2017-01-01'),
          end: new Date('2018-01-01'),
          style: {},
          time: createTime({
            start: new Date('2017-01-01'),
            end: new Date('2018-01-01'),
            zoom: 1,
          }),
          title: 'Element 1',
        },
        {
          id: '2',
          altId: '2',
          start: new Date('2018-01-01'),
          end: new Date('2017-01-01'),
          style: {},
          time: createTime({
            start: new Date('2017-01-01'),
            end: new Date('2018-01-01'),
            zoom: 1,
          }),
          title: 'Element 2',
        },
      ],
    })
    const wrapper = render(<Track {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-track__element').length).toBe(1)
  })

  it('renders <Tracks /> if is open and tracks exist (no clickElement)', () => {
    const props = createProps({
      isOpen: true,
      tracks: [
        {
          elements: [],
          id: '1',
          title: 'Test Title',
        },
      ],
    })
    const wrapper = render(<Track {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-tracks').length).toBe(1)
  })

  it('renders <Tracks /> if is open', () => {
    const props = createProps({
      isOpen: true,
      tracks: [
        {
          elements: [],
          id: '1',
          title: 'Test Title',
        },
      ],
      clickElement: jest.fn(),
    })
    const wrapper = render(<Track {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-tracks').length).toBe(1)
  })

  it('does not render <Tracks /> is is not open', () => {
    const props = createProps({
      isOpen: false,
      tracks: [
        {
          elements: [],
          id: '1',
          title: 'Test Title',
        },
      ],
    })
    const wrapper = render(<Track {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-tracks').length).toBe(0)
  })

  it('does not render <Tracks /> if there are no tracks', () => {
    const props = createProps({
      isOpen: true,
      tracks: [],
    })
    const wrapper = render(<Track {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-tracks').length).toBe(0)
  })
})
