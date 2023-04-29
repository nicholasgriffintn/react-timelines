import { render, fireEvent, act } from '@testing-library/react'

import type { ComponentProps } from 'react'
import { StickySettings } from '../../types'
import createTime from '../../utils/time'

import Header from './Header'

type HeaderProps = ComponentProps<typeof Header>

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

function createProps(baseValues: Partial<HeaderProps> = {}): HeaderProps {
  const {
    time = createTime({
      start: new Date(),
      end: new Date(),
      zoom: 1,
    }),
    timebar = [],
    onMove = jest.fn(),
    onEnter = jest.fn(),
    onLeave = jest.fn(),
    sticky = createStickySettings(),
  } = baseValues

  return {
    time,
    timebar,
    onMove,
    onEnter,
    onLeave,
    sticky,
    width: '1000px',
  }
}

describe('<Header />', () => {
  it('renders <Timebar />', () => {
    const props = createProps()
    const wrapper = render(<Header {...props} />)

    expect(wrapper.container.getElementsByClassName('rt-timebar').length).toBe(1)
  })

  it('calls "onMove" on mouse move event', () => {
    const onMove = jest.fn()
    const props = createProps({ onMove })
    const wrapper = render(<Header {...props} />)

    act(() => {
      fireEvent.mouseMove(wrapper.container)
    })

    expect(onMove).toHaveBeenCalled()
  })

  it('calls "onEnter" on mouse enter event', () => {
    const onEnter = jest.fn()
    const props = createProps({ onEnter })
    const wrapper = render(<Header {...props} />)

    act(() => {
      fireEvent.mouseEnter(wrapper.container)
    })

    expect(onEnter).toHaveBeenCalled()
  })

  it('calls "onLeave" on mouse leave event', () => {
    const onLeave = jest.fn()
    const props = createProps({ onLeave })
    const wrapper = render(<Header {...props} />)

    act(() => {
      fireEvent.mouseLeave(wrapper.container)
    })

    expect(onLeave).toHaveBeenCalled()
  })

  describe('sticky', () => {
    it('calls the setHeaderHeight() prop when mounted', () => {
      const setHeaderHeight = jest.fn()
      const sticky = createStickySettings({ setHeaderHeight })
      const props = createProps({ sticky })
      render(<Header {...props} />)
      expect(setHeaderHeight).toHaveBeenCalled()
    })

    it('makes the header sticky if isSticky is true', () => {
      const sticky = createStickySettings({ isSticky: true })
      const props = createProps({ sticky })
      const wrapper = render(<Header {...props} />)

      expect(wrapper.container.getElementsByClassName('rt-timeline__header')).toHaveClass('is-sticky')
    })

    it('makes the header static if isSticky is false', () => {
      const sticky = createStickySettings({ isSticky: false })
      const props = createProps({ sticky })
      const wrapper = render(<Header {...props} />)

      expect(wrapper.container.getElementsByClassName('rt-timeline__header')).not.toHaveClass('is-sticky')
    })

    it('handles scroll events when sticky', () => {
      const handleHeaderScrollY = jest.fn()
      const sticky = createStickySettings({
        isSticky: true,
        handleHeaderScrollY,
      })
      const props = createProps({ sticky })
      const wrapper = render(<Header {...props} />)

      act(() => {
        fireEvent.scroll(wrapper.container.getElementsByClassName('rt-timeline__header')[0])
      })

      expect(handleHeaderScrollY).toHaveBeenCalled()
    })
  })
})
