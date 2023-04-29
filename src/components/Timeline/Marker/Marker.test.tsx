import { render } from '@testing-library/react'

import Marker from '.'

const createProps = ({ x = 0, modifier = '', children = <div>test</div>, visible = false, highlighted = false }) => ({
  x,
  modifier,
  children,
  visible,
  highlighted,
})

describe('<Marker />', () => {
  it('renders the className modifier', () => {
    const modifier = 'test-modifier'
    const props = createProps({ modifier })
    const wrapper = render(<Marker {...props} />)

    expect(wrapper.container).toHaveClass(modifier)
  })

  it('is visible if "visible" is truthy', () => {
    const visible = true
    const props = createProps({ visible })
    const wrapper = render(<Marker {...props} />)

    expect(wrapper.container).toHaveClass('is-visible')
  })

  it('is invisible if "visible" is falsy', () => {
    const visible = false
    const props = createProps({ visible })
    const wrapper = render(<Marker {...props} />)

    expect(wrapper.container).not.toHaveClass('is-visible')
  })

  it('is highlighted if "highlighted" is truthy', () => {
    const highlighted = true
    const props = createProps({ highlighted })
    const wrapper = render(<Marker {...props} />)

    expect(wrapper.container).toHaveClass('is-highlighted')
  })

  it('is not highlighted if "highlighted" is falsy', () => {
    const highlighted = false
    const props = createProps({ highlighted })
    const wrapper = render(<Marker {...props} />)

    expect(wrapper.container).not.toHaveClass('is-highlighted')
  })

  it('follows the horizontal mouse position', () => {
    const x = 100
    const props = createProps({ x })
    const wrapper = render(<Marker {...props} />)

    expect(wrapper.container).toHaveStyle('left: 100px')
  })
})
