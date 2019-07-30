import React from 'react'
import styled from 'styled-components'
import { APP, CONSOLE, PLAY } from 'appConstants'

const Square = styled.div`
  flex: 1;
  min-width: 46%;
  margin: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.status === CONSOLE.IDLE ||
    props.pokeAnimate ? props.highlightColor : props.color};
  border-radius: 20px;
  pointer-events: ${props => props.turn === PLAY.COMPUTER_TURN ||
    props.status === CONSOLE.IDLE ? 'none' : 'auto'}
`

const GameSquare = ({
  pokeName,
  pokeAttributes,
  status,
  handleUserSelectGameSquare,
  pokeAnimate,
  turn,
  children
}) => {
  const { color = '', highlightColor = '' } = pokeAttributes
  const animateTime = APP.ANIMATE_TIME

  return (
    <Square
      className='game-square'
      id={pokeName}
      onClick={(e) => handleUserSelectGameSquare(pokeName, animateTime)}
      {...{ color, highlightColor, status, pokeAnimate, turn }}
    >
      {children}
    </Square>
  )
}

export default GameSquare
