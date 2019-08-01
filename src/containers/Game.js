import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { getAllPokemon, setCompleteSequence } from 'actions'

import { GameLayout, GameConsole, PlayController } from 'containers'
import { GameBoard } from 'components'

class Game extends Component {
  componentWillMount () {
    this.props.getAllPokemon()
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
  pokemonData: state.pokemonData,
  notification: state.notification
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
