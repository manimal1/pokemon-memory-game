import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import isEmpty from 'validate.io-empty'

import { getAllPokemon, setCompleteSequence } from 'actions'

import { GameLayout, GameConsole, PlayController } from 'containers'
import { GameBoard } from 'components'

class Game extends Component {
  componentWillMount () {
    this.props.getAllPokemon()
  }

  componentDidUpdate (prevProps) {
    const { pokemonData, getAllPokemon, setCompleteSequence } = this.props
    const { pokemon } = pokemonData
    const didPokemonChange = prevProps.pokemon !== pokemon

    // get the pokemon from api
    if (didPokemonChange && isEmpty(pokemon)) {
      getAllPokemon()
    }

    // sets more poke attributes and the order of play
    if (didPokemonChange && !isEmpty(pokemon)) {
      setCompleteSequence(pokemon)
    }
  }

  render () {
    const { pokemonData, isMobile } = this.props
    const { isFetching = false } = pokemonData

    return (
      <GameLayout {...{ isMobile }}>
        {isFetching &&
          <h1>Loading!</h1>
        }
        <>
          <GameConsole />
          <GameBoard {...{ isMobile }}>
            <PlayController {...{ isMobile }} />
          </GameBoard>
        </>
      </GameLayout>
    )
  }
}

const mapStateToProps = state => ({
  pokemonData: state.pokemonData
})

export default compose(
  connect(
    mapStateToProps,
    {
      getAllPokemon,
      setCompleteSequence
    }
  )
)(Game)
