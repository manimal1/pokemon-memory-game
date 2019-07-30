import React from 'react'
import styled from 'styled-components'

const Board = styled.div`
  position: relative;
  max-width: 900px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-height: ${props => props.isMobile ? '72%' : '100vh'};
  margin-top: ${props => props.isMobile ? '14%' : '0'};
`

const GameBoard = props => {
  const { isMobile } = props

  return (
    <Board className='game-board' {...{ isMobile }}>
      { props.children }
    </Board>
  )
}

export default GameBoard
