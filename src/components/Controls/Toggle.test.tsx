import { render, screen, act, fireEvent } from '@testing-library/react'

import Toggle from '@src/components/Controls/Toggle'

describe('<Toggle />', () => {
  it('displays "Close" when open', () => {
    render(<Toggle toggleOpen={jest.fn()} isOpen />)

    expect(screen.getByRole('button', { name: 'Close Controls' })).toBeInTheDocument()
  })

  it('displays "Open" when closed', () => {
    render(<Toggle toggleOpen={jest.fn()} isOpen={false} />)

    expect(screen.getByRole('button', { name: 'Open Controls' })).toBeInTheDocument()
  })

  it('calls "toggleOpen()" when clicked', () => {
    const toggleOpen = jest.fn()
    const wrapper = render(<Toggle toggleOpen={toggleOpen} isOpen />)

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Close Controls' }))
    })

    expect(screen.getByRole('button', { name: 'Open Controls' })).toBeInTheDocument()
    expect(toggleOpen).toHaveBeenCalled()
  })
})
