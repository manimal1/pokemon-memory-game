import React from 'react'
import Img from 'react-cloudinary-lazy-image'
import { APP } from 'appConstants'

const ImageLoader = ({ publicId = '', handleImageError = null, width = 0, height = 0 }) => {
  return (
    <div>
      <Img
        cloudName={APP.CLOUDINARY_CLOUD_NAME}
        imageName={publicId}
        fixed={{
          width,
          height
        }}
        onError={handleImageError}
      />
    </div>
  )
}

export default ImageLoader
