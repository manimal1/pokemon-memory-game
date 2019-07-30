import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import {
  handleStart,
  handleRestart,
  setPartialSequence,
  switchTurnToComputer
} from 'actions'

import { GameConsoleView } from 'components'

class GameConsole extends Component {
  constructor (props) {
    super(props)
    this.initiateStartSequence = this.initiateStartSequence.bind(this)
    this.startGame = this.startGame.bind(this)
    this.restartGame = this.restartGame.bind(this)
  }

  initiateStartSequence () {
    // get the first item in our ordered game item list
    const { play, setPartialSequence, switchTurnToComputer } = this.props
    const firstItem = play.completeSequence[0]
    // set our first step in the partial order, which will be incremented and expanded
    // by the ComputerPlayController container component
    let partialSequence = [firstItem]
    setPartialSequence(partialSequence)
    switchTurnToComputer()
  }

  startGame () {
    this.props.handleStart()
    this.initiateStartSequence()
  }

  restartGame () {
    this.props.handleRestart()
    this.initiateStartSequence()
  }

  render () {
    const { gameConsole, play } = this.props
    const gameStatus = gameConsole.status
    const turnCounter = play.partialSequence.length
    const startGame = this.startGame
    const restartGame = this.restartGame

    return (
      <GameConsoleView {...{ startGame, restartGame, turnCounter, gameStatus }} />
    )
  }
}

const mapStateToProps = state => ({
  gameConsole: state.gameConsole,
  play: state.play
})

export default compose(
  connect(
    mapStateToProps,
    {
      handleStart,
      handleRestart,
      setPartialSequence,
      switchTurnToComputer
    }
  )
)(GameConsole)
