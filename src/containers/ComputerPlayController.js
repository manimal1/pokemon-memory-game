import React, { Component } from 'react' // eslint-disable-line
import { connect } from 'react-redux'
import { compose } from 'redux'
import { APP, PLAY } from 'appConstants'

import {
  updateComputerTurnCount,
  switchTurnToPlayer
} from 'actions'

class ComputerPlayController extends Component {
  constructor (props) {
    super(props)
    this.playPartialSequence = this.playPartialSequence.bind(this)
  }

  componentDidUpdate () {
    const { play } = this.props
    const { turn, partialSequence } = play

    if (turn === PLAY.COMPUTER_TURN) {
      this.playPartialSequence(partialSequence)
    }
  }

  playPartialSequence (partialSequence) {
    const {
      play,
      switchTurnToPlayer,
      handleSquareAnimation,
      updateComputerTurnCount
    } = this.props
    let { computerTurnCount } = play
    const animateTime = APP.ANIMATE_TIME
    computerTurnCount = Number(computerTurnCount)

    // first check if computer has performed all of its moves
    // and if so, hand control back to player
    if (partialSequence.length === computerTurnCount) {
      return switchTurnToPlayer()
    }

    for (let i = 0; i <= computerTurnCount; i++) {
      // reanimate is needed to reset animation on mulitple computer single-card plays
      // where one card is played multiple times
      // otherwise, animation on game square will not play again but remain set to false
      // due to setTimeout overlap
      let reanimate = false
      if (partialSequence[i] === partialSequence[i - 1]) {
        reanimate = true
      }
      // calculate timed moves to allow for highlight actions to display
      // must allow same animation time for each turn played [i]
      // and account for start [index 0] and end times [brief pause at end], or +2
      let time = animateTime * (i + 2)
      setTimeout(() => {
        handleSquareAnimation(partialSequence[i], animateTime, reanimate)
      }, time)
    }
    // increment the number of moves played by computer
    const incrementComputerTurn = computerTurnCount + 1
    updateComputerTurnCount(incrementComputerTurn)
  }

  render () {
    return ''
  }
}

const mapStateToProps = state => ({
  game: state.game,
  play: state.play
})

export default compose(
  connect(
    mapStateToProps,
    {
      updateComputerTurnCount,
      switchTurnToPlayer
    }
  )
)(ComputerPlayController)
