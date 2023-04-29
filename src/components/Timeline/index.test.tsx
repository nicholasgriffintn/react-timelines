import { render, act, fireEvent } from '@testing-library/react'

import Timeline from '.'
import createTime from '@src/utils/time'

import { StickySettings, TimebarEntry } from '@src/types'

jest.mock('@src/utils/getMouseX')

type TimelineProps = React.ComponentProps<typeof Timeline>

const time = createTime({
  start: new Date('2018-01-01'),
  end: new Date('2019-01-01'),
  zoom: 1,
})

function createStickySettings(baseValues: Partial<StickySettings> = {}): StickySettings {
  const {
    isSticky = false,
    setHeaderHeight = jest.fn(),
    handleHeaderScrollY = jest.fn(),
    headerHeight = 0,
    viewportWidth = 0,
    scrollLeft = 0,
  } = baseValues
  return {
    isSticky,
    setHeaderHeight,
    handleHeaderScrollY,
    headerHeight,
    viewportWidth,
    scrollLeft,
  }
}

const defaultTimebar: TimebarEntry[] = [
  {
    useAsGrid: true,
    id: '1',
    cells: [
      {
        id: 'cell-1',
        end: new Date('2022-01-01'),
        start: new Date('2021-01-01'),
        title: 'Cell 1',
      },
    ],
    style: {},
    title: 'Default Timebar',
  },
]

function createTimelineProps(baseValues: Partial<TimelineProps> = {}): TimelineProps {
  const { now = new Date(), timebar = defaultTimebar, tracks = [], sticky = createStickySettings() } = baseValues

  return {
    now,
    time,
    timebar,
    tracks,
    sticky,
  }
}

describe('<Timeline />', () => {
  it('renders <NowMarker />, <Header /> and <Body />', () => {
    const props = createTimelineProps()
    const wrapper = render(<Timeline {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-marker--now').length).toBe(1)
    expect(wrapper.container.getElementsByClassName('rt-timeline__header').length).toBe(1)
    expect(wrapper.container.getElementsByClassName('rt-timeline__body').length).toBe(1)
  })

  it('renders <Body /> passing in appropriate grid cells', () => {
    const props = createTimelineProps()
    const wrapper = render(<Timeline {...props} />)
    const expected = defaultTimebar[0].cells

    expect(wrapper.container.getElementsByClassName('rt-timeline__body')[0]).toHaveAttribute('grid', expected)
  })

  describe('markers', () => {
    it('does not render <PointerMarker /> when component mounts', () => {
      const props = createTimelineProps()
      const wrapper = render(<Timeline {...props} />)

      expect(wrapper.container.getElementsByClassName('rt-marker--pointer').length).toBe(0)
    })

    it('renders <PointerMarker /> when component mounts', () => {
      const props = createTimelineProps()
      const wrapper = render(<Timeline {...props} />)

      act(() => {
        fireEvent.mouseMove(wrapper.container)
      })

      expect(wrapper.container.getElementsByClassName('rt-marker--pointer').length).toBe(1)
    })
  })
})
