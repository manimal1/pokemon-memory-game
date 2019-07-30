import React, { Component } from 'react'
import cloudinary from 'cloudinary-core'
import { APP } from 'appConstants'

const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: APP.CLOUDINARY_CLOUD_NAME })

class GameLayout extends Component {
  getBackgroundImage (publicId) {
    return cloudinaryCore.url(publicId)
  }

  render () {
    const bgUrl = `url(${this.getBackgroundImage(APP.LAYOUT_BG_IMAGE_PATH)})`
    if (!bgUrl) return ''

    return (
      <div
        className='game-layout'
        style={{
          backgroundImage: bgUrl,
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default GameLayout
