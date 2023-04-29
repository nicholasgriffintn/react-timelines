import { render } from '@testing-library/react'

import Timeline from '.'

const defaultStart = new Date('2010-01-01')
const defaultEnd = new Date('2030-01-01')

const createScaleProps = ({
  start = defaultStart,
  end = defaultEnd,
  zoom = 1,
  zoomMin = undefined,
  zoomMax = undefined,
  minWidth = undefined,
} = {}) => ({
  start,
  end,
  zoom,
  zoomMin,
  zoomMax,
  minWidth,
})

const createProps = ({
  now = new Date(),
  scale = createScaleProps(),
  isOpen = undefined,
  timebar = [],
  tracks = [],
  toggleOpen = jest.fn(),
  zoomIn = jest.fn(),
  zoomOut = jest.fn(),
} = {}) => ({
  now,
  scale,
  isOpen,
  timebar,
  tracks,
  toggleOpen,
  zoomIn,
  zoomOut,
})

describe('<Timeline />', () => {
  describe('Timeline', () => {
    it('renders <Controls />', () => {
      const props = createProps()
      const wrapper = render(<Timeline {...props} />)

      expect(wrapper.container.getElementsByClassName('rt-controls').length).toBe(1)
    })

    it('renders <Layout />', () => {
      const props = createProps()
      const wrapper = render(<Timeline {...props} />)

      expect(wrapper.container.getElementsByClassName('rt-layout').length).toBe(1)
    })

    it('renders the sidebar open by default', () => {
      const props = createProps()
      const wrapper = render(<Timeline {...props} />)

      expect(wrapper.container.getElementsByClassName('rt-layout rt-is-open').length).toBe(1)
    })
  })
})
