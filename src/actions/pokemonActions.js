import axios from 'axios'
import { POKEMON, ERRORS } from 'appConstants'
import { pokeAttributes } from 'utils/pokeAttributes'
import { noResponseError } from 'utils/noResponseError'

const {
  GET_ALL_POKEMON_REQUEST,
  GET_ALL_POKEMON_SUCCESS,
  GET_ALL_POKEMON_FAIL
} = POKEMON

const getAllPokemonRequest = () => ({
  type: GET_ALL_POKEMON_REQUEST
})

const getAllPokemonSuccess = pokemon => ({
  type: GET_ALL_POKEMON_SUCCESS,
  payload: pokemon
})

const getAllPokemonFail = err => ({
  type: GET_ALL_POKEMON_FAIL,
  payload: returnError(err)
})

const dispatchAppError = err => ({
  type: ERRORS.GET_ERRORS,
  payload: returnError(err)
})

const returnError = err => !err.status ? noResponseError(err) : err

// just mapping some more data that to extend app functionality
export const addPokeAttributes = (pokemon, attributes) => {
  return pokemon.map(poke => {
    for (let [key, value] of Object.entries(attributes)) {
      if (key === poke.name) {
        poke.attributes = value
        return poke
      }
    }
  })
}

export const getAllPokemon = () => dispatch => {
  return axios
    .get('https://pokeapi.co/api/v2/pokemon/?limit=4')
    .then(res => {
      dispatch(getAllPokemonRequest())
      const fetchedPokemon = res.data.results
      const pokemon = addPokeAttributes(fetchedPokemon, pokeAttributes)
      dispatch(getAllPokemonSuccess(pokemon))
    })
    .catch(err => {
      dispatch(getAllPokemonFail(err))
      dispatch(dispatchAppError(err))
    })
}
