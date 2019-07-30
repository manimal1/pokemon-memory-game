import React, { Component } from 'react'

import { Game } from './containers'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { isMobile: false }
    this.checkViewportWidth = this.checkViewportWidth.bind(this)
  }

  componentWillMount () {
    window.addEventListener('resize', this.checkViewportWidth)
    this.checkViewportWidth()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.checkViewportWidth)
  }

  checkViewportWidth () {
    const { isMobile } = this.state
    if (window.innerWidth <= 960) {
      if (!isMobile) {
        this.setState({ isMobile: true })
      }
    } else {
      if (isMobile) {
        this.setState({ isMobile: false })
      }
    }
  }

  render () {
    const { isMobile } = this.state
    return (
      <main className='main'>
        <Game {...{ isMobile }} />
      </main>
    )
  }
}

export default App
