import { CONSOLE, PLAY } from 'appConstants'

const {
  IDLE,
  START,
  RESTART
} = CONSOLE

const initialState = {
  status: IDLE
}

const consoleReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case START:
      return {
        status: payload
      }

    case RESTART:
      return {
        status: payload
      }

    case PLAY.PLAYER_LOSES:
      return {
        ...initialState
      }

    default:
      return state
  }
}

export default consoleReducer
