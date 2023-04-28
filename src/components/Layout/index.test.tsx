import { render, screen } from '@testing-library/react'

import Layout from '.'
import Sidebar from '@src/components/Sidebar/Sidebar'
import Timeline from '@src/components/Timeline'
import createTime from '@src/utils/time'

import computedStyle from '@src/utils/computedStyle'
import raf from '@src/utils/raf'

type LayoutProps = React.ComponentProps<typeof Layout>

jest.mock('../Sidebar/Sidebar', () => () => null)
jest.mock('../Timeline', () => () => null)
jest.mock('@src/utils/computedStyle')
jest.mock('@src/utils/events')
jest.mock('@src/utils/raf')

function createProps(baseValues: Partial<LayoutProps> = {}): LayoutProps {
  const fallbackTime = createTime({
    start: new Date(),
    end: new Date(),
    zoom: 1,
  })
  fallbackTime.fromX = jest.fn(() => new Date())
  fallbackTime.toX = jest.fn(() => 0)
  const {
    timebar = [],
    tracks = [],
    now = new Date(),
    isOpen = false,
    toggleTrackOpen = jest.fn(),
    enableSticky = true,
    onLayoutChange = jest.fn(),
    timelineViewportWidth = 1000,
    sidebarWidth = 200,
  } = baseValues
  const time = baseValues.time || fallbackTime

  return {
    timebar,
    time,
    tracks,
    now,
    isOpen,
    toggleTrackOpen,
    enableSticky,
    onLayoutChange,
    timelineViewportWidth,
    sidebarWidth,
  }
}

describe('<Layout />', () => {
  beforeEach(() => {
    ;(computedStyle as jest.Mock).mockImplementation(node => ({
      getPropertyValue(prop: string) {
        return node.style[prop]
      },
    }))
    ;(raf as jest.Mock).mockImplementation(fn => fn())
  })

  it('renders <Sidebar /> and <Timeline />', () => {
    const props = createProps()
    const wrapper = render(<Layout {...props} />)
    expect(wrapper.find(Sidebar).exists()).toBe(true)
    expect(wrapper.find(Timeline).exists()).toBe(true)
  })

  it('renders <Sidebar /> in an open state', () => {
    const props = createProps({ isOpen: true })
    const wrapper = render(<Layout {...props} />)
    expect(wrapper.find('.rt-layout').prop('className')).toMatch('is-open')
  })

  it('renders <Sidebar /> in a closed state', () => {
    const props = createProps({ isOpen: false })
    const wrapper = render(<Layout {...props} />)
    expect(wrapper.find('.rt-layout').prop('className')).not.toMatch('is-open')
  })
})
