import React from 'react'
import { screen } from '@testing-library/react'

import Home from './index'
import { renderMUI } from '../utils/renderMUI'

describe('Home', () => {
  it('should render Home', async () => {
    renderMUI(<Home />)

    expect(screen.getByText('TEST')).toBeInTheDocument()
  })
})
