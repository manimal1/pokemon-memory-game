import React, { Component } from 'react'
import styled from 'styled-components'
import CardImageErrorBoundary from './CardImageErrorBoundary'
import ImageLoader from './ImageLoader'

const Card = styled.div`
  position: relative;
  width: ${props => props.isMobile ? '150px' : '320px'};
  height: ${props => props.isMobile ? '120px' : '280px'};
  padding: 32px;  
`

const Name = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  text-align: center;
  color: white;
  font-weight: 600;
`

class GameCard extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
    this.handleImageError = this.handleImageError.bind(this)
  }

  handleImageError () {
    this.setState({ hasError: true })
  }

  render () {
    if (!this.props.poke) {
      return ''
    }

    const { poke, isMobile } = this.props
    const { hasError } = this.state
    const handleImageError = this.handleImageError
    const publicId = poke.attributes.imagePath
    const width = isMobile ? 150 : 320
    const height = isMobile ? 120 : 280

    return (
      <Card
        {...{ isMobile }}
      >
        <CardImageErrorBoundary {...{ isMobile, hasError }}>
          <ImageLoader {...{ publicId, handleImageError, width, height }} />
        </CardImageErrorBoundary>
        <Name>{poke.name}</Name>
      </Card>
    )
  }
}

export default GameCard
