import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import {
  handleStart,
  handleRestart,
  setCompleteSequence,
  setPartialSequence,
  switchTurnToComputer
} from 'actions'

import { GameConsoleView } from 'components'

class GameConsole extends Component {
  constructor (props) {
    super(props)
    this.handleStartSequence = this.handleStartSequence.bind(this)
    this.startGame = this.startGame.bind(this)
    this.restartGame = this.restartGame.bind(this)
  }

  handleStartSequence () {
    const { pokemonData, setCompleteSequence } = this.props
    const { pokemon } = pokemonData
    const completeSequence = setCompleteSequence(pokemon)
    const initiateStartSequence = Promise.resolve(completeSequence)
    // start by creating the complete play sequence
    // then create the first partial sequence to begin play
    return initiateStartSequence
      .then(() => {
        const { play, setPartialSequence, switchTurnToComputer } = this.props
        // get the first item in our ordered game item list
        const firstItem = play.completeSequence[0]
        // set our first step in the partial order, which will be incremented and expanded
        // by the ComputerPlayController component
        let partialSequence = [firstItem]
        setPartialSequence(partialSequence)
        switchTurnToComputer()
      })
  }

  startGame () {
    this.props.handleStart()
    this.handleStartSequence()
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
  play: state.play,
  pokemonData: state.pokemonData
})

export default compose(
  connect(
    mapStateToProps,
    {
      handleStart,
      handleRestart,
      setCompleteSequence,
      setPartialSequence,
      switchTurnToComputer
    }
  )
)(GameConsole)
