import reducer from '../pokemonReducer'
import { POKEMON } from 'appConstants'
import pokemonMocks from 'mockResultsJS/pokemonMocks'

const {
  GET_ALL_POKEMON_REQUEST,
  GET_ALL_POKEMON_SUCCESS,
  GET_ALL_POKEMON_FAIL
} = POKEMON

describe('pokemon reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        pokemon: [],
        isFetching: false,
        error: null
      }
    )
  })

  it('should handle GET_ALL_POKEMON_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: GET_ALL_POKEMON_REQUEST
      })
    ).toEqual(
      {
        pokemon: [],
        error: null,
        isFetching: true
      }
    )
  })

  it('should handle GET_ALL_POKEMON_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: GET_ALL_POKEMON_SUCCESS,
        payload: pokemonMocks
      })
    ).toEqual(
      {
        pokemon: pokemonMocks,
        error: null,
        isFetching: false
      }
    )
  })

  it('should handle GET_ALL_POKEMON_FAIL', () => {
    expect(
      reducer(undefined, {
        type: GET_ALL_POKEMON_FAIL,
        payload: { error: { status: 404 } }
      })
    ).toEqual(
      {
        pokemon: [],
        error: { error: { status: 404 } },
        isFetching: false
      }
    )
  })
})
