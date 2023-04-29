import { render, screen, act, fireEvent } from '@testing-library/react'

import Controls from '@src/components/Controls'

const createProps = ({
  isOpen = undefined,
  toggleOpen = jest.fn(),
  zoomIn = jest.fn(),
  zoomOut = jest.fn(),
  zoom = 2,
  zoomMin = 1,
  zoomMax = 10,
} = {}) => ({
  isOpen,
  toggleOpen,
  zoomIn,
  zoomOut,
  zoom,
  zoomMin,
  zoomMax,
})

describe('<Controls />', () => {
  describe('Toggle', () => {
    it('render <Toggle />', () => {
      const props = createProps()
      render(<Controls {...props} />)

      expect(screen.getByRole('button', { name: 'Close Controls' })).toBeInTheDocument()
    })

    it('do not render <Toggle /> if no "toggleOpen" prop', () => {
      const props = { ...createProps(), toggleOpen: undefined }
      render(<Controls {...props} />)

      expect(screen.getByRole('button', { name: 'Close Controls' })).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Open Controls' })).not.toBeInTheDocument()
    })
  })

  describe('Zoom in button', () => {
    it('not rendered if no "zoomIn" fn passed', () => {
      const props = { ...createProps(), zoomIn: undefined }
      render(<Controls {...props} />)

      expect(screen.getByRole('button', { name: 'Zoom In' })).not.toBeInTheDocument()
    })

    it('is disabled when "zoom" is equal to "zoomMax"', () => {
      const props = createProps({ zoom: 5, zoomMax: 5 })
      render(<Controls {...props} />)

      expect(screen.getByRole('button', { name: 'Zoom In' })).toBeDisabled()
    })

    it('is disabled when "zoom" is greater than "zoomMax"', () => {
      const props = createProps({ zoom: 6, zoomMax: 5 })
      render(<Controls {...props} />)

      expect(screen.getByRole('button', { name: 'Zoom In' })).toBeDisabled()
    })

    it('is not disabled when "zoom" is less than "zoomMax"', () => {
      const props = createProps({ zoom: 2, zoomMax: 5 })
      render(<Controls {...props} />)

      expect(screen.getByRole('button', { name: 'Zoom In' })).not.toBeDisabled()
    })

    it('calls "zoomIn() when clicked"', () => {
      const zoomIn = jest.fn()
      const props = createProps({ zoom: 2, zoomMax: 5, zoomIn })
      render(<Controls {...props} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Zoom In' }))
      })

      expect(zoomIn).toHaveBeenCalled()
    })
  })

  describe('Zoom out button', () => {
    it('not rendered if no "zoomOut" fn passed', () => {
      const props = { ...createProps(), zoomOut: undefined }
      render(<Controls {...props} />)

      expect(screen.getByRole('button', { name: 'Zoom Out' })).not.toBeInTheDocument()
    })

    it('is disabled when "zoom" is equal to "zoomMin"', () => {
      const props = createProps({ zoom: 2, zoomMin: 2 })
      render(<Controls {...props} />)

      expect(screen.getByRole('button', { name: 'Zoom Out' })).toBeDisabled()
    })

    it('is disabled when "zoom" is less than "zoomMin"', () => {
      const props = createProps({ zoom: 1, zoomMin: 2 })
      render(<Controls {...props} />)

      expect(screen.getByRole('button', { name: 'Zoom Out' })).toBeDisabled()
    })

    it('is not disabled when "zoom" is greater than "zoomMin"', () => {
      const props = createProps({ zoom: 5, zoomMin: 2 })
      render(<Controls {...props} />)

      expect(screen.getByRole('button', { name: 'Zoom Out' })).not.toBeDisabled()
    })

    it('calls "zoomOut() when clicked"', () => {
      const zoomOut = jest.fn()
      const props = createProps({ zoom: 5, zoomMin: 2, zoomOut })
      render(<Controls {...props} />)

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Zoom Out' }))
      })

      expect(zoomOut).toHaveBeenCalled()
    })
  })
})
