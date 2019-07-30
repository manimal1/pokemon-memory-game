import React, { Component } from 'react'
import Img from 'react-cloudinary-lazy-image'
import { APP } from 'appConstants'

class CardImageErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidUpdate (prevProps) {
    const { hasError } = this.props
    if (prevProps.hasError !== hasError) {
      this.setState({ hasError })
    }
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true })
    console.error(error, info)
  }

  render () {
    const { isMobile } = this.props
    if (this.state.hasError) {
      // load fallback image if CDN image returns error
      return (
        <div>
          <Img
            cloudName={APP.CLOUDINARY_CLOUD_NAME}
            imageName={APP.DEFAULT_CARD_IMAGE_PATH}
            fixed={{
              width: isMobile ? 150 : 320,
              height: isMobile ? 120 : 280
            }}
          />
        </div>
      )
    }
    return this.props.children
  }
}

export default CardImageErrorBoundary
