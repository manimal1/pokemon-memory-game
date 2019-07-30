import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import isEmpty from 'validate.io-empty'
import { APP, CONSOLE, PLAY, NOTIFICATION } from 'appConstants'

import {
  setCompleteSequence,
  setPlayerSequence,
  updatePlayerTurnCount,
  handleCheckPlayerSequence,
  handlePlayerLoses
} from 'actions'

import { GameSquare, GameCard } from 'components'
import ComputerPlayController from './ComputerPlayController'

class PlayController extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokeAnimate: {},
      isMounted: false
    }
    this.handleUserSelectGameSquare = this.handleUserSelectGameSquare.bind(this)
    this.handleSquareAnimation = this.handleSquareAnimation.bind(this)
    this.setSquareToAnimate = this.setSquareToAnimate.bind(this)
  }

  componentDidMount () {
    this.setState({ isMounted: true })
  }

  componentWillUnmount () {
    this.setState({ isMounted: false })
  }

  componentDidUpdate (prevProps) {
    const { isMounted } = this.state
    const { pokemonData } = this.props
    const { pokemon } = pokemonData
    const hasPokemon = !!pokemon && !isEmpty(pokemon)
    const isPokemonPropsChange = prevProps.pokemonData.pokemon !== pokemon

    // sets animation boolean for each square
    // this is used by the component to add/remove animation effects
    // I handle square animation effects using component state
    // but base-character colors I set in Redux state intentionally
    if (isPokemonPropsChange && hasPokemon && isMounted) {
      this.setPokeAnimateAttribute(pokemon)
    }
  }

  setPokeAnimateAttribute (pokemon) {
    let pokeAnimate = {}
    pokemon.forEach(poke => {
      pokeAnimate[poke.name] = false
    })
    this.setState({ pokeAnimate })
  }

  // handles when a user clicks a game square, triggering animation
  handleUserSelectGameSquare (pokeName, time) {
    const { gameConsole, play } = this.props
    const { turn } = play
    const { status } = gameConsole

    if (status !== CONSOLE.RUNNING || turn !== PLAY.PLAYER_TURN) return null
    this.handleSquareAnimation(pokeName, time)
    this.handlePlayActions(pokeName)
  }

  handlePlayActions (pokeName) {
    const {
      pokemonData,
      play,
      setCompleteSequence,
      setPlayerSequence,
      updatePlayerTurnCount,
      handleCheckPlayerSequence,
      handlePlayerLoses
    } = this.props
    const {
      completeSequence,
      playerTurnCount,
      partialSequence,
      playerSequence
    } = play
    const { pokemon } = pokemonData
    const incrementPlayerTurnCount = playerTurnCount + 1
    const updatedPlayerSequence = [...playerSequence, pokeName]
    const isPlayerSelectionCorrect = partialSequence[playerTurnCount] === updatedPlayerSequence[playerTurnCount]

    if (!isPlayerSelectionCorrect) {
      window.alert(NOTIFICATION.LOSER)
      handlePlayerLoses()
      return setCompleteSequence(pokemon)
    }
    setPlayerSequence(updatedPlayerSequence)
    updatePlayerTurnCount(incrementPlayerTurnCount)
    handleCheckPlayerSequence(updatedPlayerSequence, partialSequence, completeSequence)
  }

  // handle game square animation
  handleSquareAnimation (pokeName, time, reanimate = false) {
    const audio = new Audio(`content/audio/${pokeName}.wav`) // eslint-disable-line
    audio.onerror = (e) => console.error(`error: audio file at ${e.path[0].src} not found`)
    this.setSquareToAnimate(pokeName, true)
    if (reanimate) {
      const reAnimateTime = APP.REANIMATE_TIME
      const calculatedTime = time - reAnimateTime
      this.setSquareAnimateTimer(pokeName, calculatedTime, true)
      audio.play()
    }
    this.setSquareAnimateTimer(pokeName, time, false)
    audio.play()
  }

  // this handles setting the highlight timing for one square played multiple times in a row
  setSquareAnimateTimer (pokeName, time, shouldAnimate) {
    setTimeout(() => {
      this.setSquareToAnimate(pokeName, shouldAnimate)
    }, time)
  }

  // sets correct poke to animate
  setSquareToAnimate (pokeName, value) {
    let { pokeAnimate } = this.state
    pokeAnimate[pokeName] = value
    this.setState({ pokeAnimate })
  }

  renderGameSquares () {
    const { pokeAnimate } = this.state
    const { isMobile, pokemonData, gameConsole, play } = this.props
    const { pokemon } = pokemonData
    const { status } = gameConsole
    const { turn } = play
    const handleUserSelectGameSquare = this.handleUserSelectGameSquare

    return pokemon.map(poke => {
      return (
        <GameSquare key={poke.name}
          {...{
            status,
            turn,
            handleUserSelectGameSquare,
            pokeName: poke.name,
            pokeAttributes: poke.attributes,
            pokeAnimate: pokeAnimate[poke.name]
          }}
        >
          <GameCard {...{
            isMobile,
            poke
          }} />
        </GameSquare>
      )
    })
  }

  render () {
    const handleSquareAnimation = this.handleSquareAnimation

    return (
      <>
        {this.renderGameSquares()}
        <ComputerPlayController {...{ handleSquareAnimation }} />
      </>
    )
  }
}

const mapStateToProps = state => ({
  pokemonData: state.pokemonData,
  gameConsole: state.gameConsole,
  play: state.play
})

export default compose(
  connect(
    mapStateToProps,
    {
      setCompleteSequence,
      setPlayerSequence,
      updatePlayerTurnCount,
      handleCheckPlayerSequence,
      handlePlayerLoses
    }
  )
)(PlayController)
