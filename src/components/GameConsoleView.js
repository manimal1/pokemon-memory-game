import React from 'react'
import styled from 'styled-components'
import { CONSOLE } from 'appConstants'

import Button from './Button'

const Console = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  background-color: slategrey;
`

const GameConsoleDisplay = props => {
  const { startGame, turnCounter, gameStatus } = props
  const isStartButtonDisabled = gameStatus === CONSOLE.RUNNING
  const turnDisplay = turnCounter >= 1 ? turnCounter.toString() : '0'

  return (
    <Console>
      <Button
        type='primary'
        bgColor='azure'
        labelColor='slategrey'
        label='Start'
        onClick={startGame}
        disabled={isStartButtonDisabled}
      />
      <Button
        type='secondary'
        bgColor='yellow'
        labelColor='red'
        label={`Turn: ${turnDisplay}`}
      />
    </Console>
  )
}

export default GameConsoleDisplay
