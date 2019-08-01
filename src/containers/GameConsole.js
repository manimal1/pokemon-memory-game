import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import {
  handleStart,
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
        const partialSequence = [firstItem]
        setPartialSequence(partialSequence)
        switchTurnToComputer()
      })
  }

  startGame () {
    this.props.handleStart()
    this.handleStartSequence()
  }

  render () {
    const { gameConsole, play } = this.props
    const gameStatus = gameConsole.status
    const turnCounter = play.partialSequence.length
    const startGame = this.startGame

    return (
      <GameConsoleView {...{ startGame, turnCounter, gameStatus }} />
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
      setCompleteSequence,
      setPartialSequence,
      switchTurnToComputer
    }
  )
)(GameConsole)
