import mockAxios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import pokemonMocksJSON from 'mockResultsJSON/pokemonMocks'
import pokemonMocksJS from 'mockResultsJS/pokemonMocks'

import { POKEMON } from 'appConstants'
import * as actions from '../pokemonActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

test('fetch images from pokemon api', async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: pokemonMocksJSON
    })
  )

  const expectedActions = [
    { type: POKEMON.GET_ALL_POKEMON_REQUEST },
    {
      type: POKEMON.GET_ALL_POKEMON_SUCCESS,
      payload: pokemonMocksJS
    }
  ]

  const store = mockStore({ pokemonData: {} })

  return store.dispatch(actions.getAllPokemon()).then(() => {
    expect(mockAxios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?limit=4')
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(store.getActions()).toEqual(expectedActions)
  })
})
