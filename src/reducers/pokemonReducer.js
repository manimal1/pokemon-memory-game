import { POKEMON, CONSOLE } from 'appConstants'

const {
  GET_ALL_POKEMON_REQUEST,
  GET_ALL_POKEMON_SUCCESS,
  GET_ALL_POKEMON_FAIL
} = POKEMON

const initialState = {
  pokemon: [],
  isFetching: false,
  error: null
}

const consoleReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_POKEMON_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case GET_ALL_POKEMON_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pokemon: payload
      }

    case GET_ALL_POKEMON_FAIL:
      return {
        ...state,
        error: payload,
        isFetching: false
      }

    case CONSOLE.RESTART:
      return initialState

    default:
      return state
  }
}

export default consoleReducer
